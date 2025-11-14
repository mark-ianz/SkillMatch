import { db } from "@/lib/db";
import { JobPostQuery } from "@/types/job_post.types";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import { getCourseByAbbr } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract filter parameters
    const courses = searchParams.getAll("course");
    const locations = searchParams.getAll("location");
    const arrangements = searchParams.getAll("arrangement");
    const industries = searchParams.getAll("industry");
    const jobCategories = searchParams.getAll("jobCategory");
    const isPaid = searchParams.get("paid");
    const search = searchParams.get("search");
    const userId = searchParams.get("userId");
    const roleName = searchParams.get("roleName");

    // Fetch user skills and course if OJT user
    let userSkills: string[] = [];
    let userCourse: string | null = null;
    if (userId && roleName === "OJT") {
      try {
        const [profileRows] = await db.query<
          (RowDataPacket & { skills: string | null; course: string | null })[]
        >(`SELECT skills, course FROM ojt_profile WHERE user_id = ?`, [userId]);

        if (profileRows.length > 0) {
          // Get skills
          if (profileRows[0].skills) {
            userSkills = profileRows[0].skills
              .split(",")
              .map((skill) => skill.trim().toLowerCase())
              .filter((skill) => skill.length > 0);
          }
          // Get course abbreviation and convert to full course name
          if (profileRows[0].course) {
            const courseAbbr = profileRows[0].course;
            userCourse = getCourseByAbbr(courseAbbr);
            console.log({ courseAbbr, userCourse });
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Continue without skill matching if fetch fails
      }
    }

    console.log({ userCourse });

    // Build dynamic WHERE clauses
    const conditions: string[] = [];
    const values: (string | number)[] = [];

    // Handle courses (comma-separated in DB, need to use FIND_IN_SET)
    if (courses.length > 0) {
      const courseConditions = courses.map(
        () => "FIND_IN_SET(?, jp.courses_required) > 0"
      );
      conditions.push(`(${courseConditions.join(" OR ")})`);
      values.push(...courses);
    }

    if (locations.length > 0) {
      conditions.push(
        `jp.city_municipality IN (${locations.map(() => "?").join(",")})`
      );
      values.push(...locations);
    }

    if (arrangements.length > 0) {
      conditions.push(
        `jp.work_arrangement IN (${arrangements.map(() => "?").join(",")})`
      );
      values.push(...arrangements);
    }

    // Handle industries
    if (industries.length > 0) {
      const industryConditions = industries.map(
        () =>
          "FIND_IN_SET(?, c.industry) > 0 OR JSON_CONTAINS(c.industry, JSON_QUOTE(?))"
      );
      conditions.push(`(${industryConditions.join(" OR ")})`);
      industries.forEach((industry) => {
        values.push(industry, industry);
      });
    }

    // Handle job categories (comma-separated in DB)
    if (jobCategories.length > 0) {
      const categoryConditions = jobCategories.map(
        () => "FIND_IN_SET(?, jp.job_categories) > 0"
      );
      conditions.push(`(${categoryConditions.join(" OR ")})`);
      values.push(...jobCategories);
    }

    if (isPaid !== null && isPaid !== undefined) {
      conditions.push(`jp.is_paid = ?`);
      values.push(isPaid === "true" ? 1 : 0);
    }

    // Handle search query (search in job title, company name, job overview, technical skills, responsibilities, and preferred qualifications)
    if (search && search.trim()) {
      conditions.push(`(
        jp.job_title LIKE ? OR 
        c.company_name LIKE ? OR 
        jp.job_overview LIKE ? OR
        jp.technical_skills LIKE ? OR
        jp.job_responsibilities LIKE ? OR
        jp.preferred_qualifications LIKE ?
      )`);
      const searchTerm = `%${search.trim()}%`;
      console.log(searchTerm);
      values.push(
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm
      );
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT
        c.company_name,
        c.company_image,
        c.website,
        c.facebook_page,
        c.company_email,
        c.industry,
        jp.*
      FROM job_posts jp
      JOIN company c ON jp.company_id = c.company_id
      ${whereClause}
      ORDER BY jp.created_at DESC;
    `;

    const [rows] = await db.query<(RowDataPacket & JobPostQuery)[]>(
      query,
      values
    );

    const formattedRows = rows.map((post: RowDataPacket & JobPostQuery) => {
      const technicalSkillsArray = post.technical_skills
        ? post.technical_skills.split(",").map((s) => s.trim())
        : [];

      const coursesRequiredArray = post.courses_required
        ? post.courses_required.split(",").map((c) => c.trim())
        : [];

      // Calculate skill match count for OJT users
      let matchCount = 0;
      console.log({ userSkills });
      if (userSkills.length > 0) {
        const postSkillsLowerCase = technicalSkillsArray.map((s) =>
          s.toLowerCase()
        );
        matchCount = userSkills.filter((userSkill) =>
          postSkillsLowerCase.includes(userSkill)
        ).length;
      }

      // Check if user's course matches any of the required courses
      const courseMatched = userCourse
        ? coursesRequiredArray.some(
            (requiredCourse) =>
              requiredCourse.toLowerCase() === userCourse.toLowerCase()
          )
        : false;

      return {
        ...post,
        is_paid: Boolean(post.is_paid),
        job_responsibilities: post.job_responsibilities.split(","),
        courses_required: coursesRequiredArray,
        job_categories: post.job_categories
          ? post.job_categories.split(",")
          : [],
        soft_skills: post.soft_skills ? post.soft_skills.split(",") : [],
        technical_skills: technicalSkillsArray,
        skill_match_count: matchCount,
        course_matched: courseMatched,
      };
    });

    // Sort by course match and skill match count if OJT user
    // Priority: 1. Course matched, 2. Higher skill matches
    const sortedRows =
      userCourse || userSkills.length > 0
        ? formattedRows.sort((a, b) => {
            // First priority: course matched
            if (a.course_matched && !b.course_matched) return -1;
            if (!a.course_matched && b.course_matched) return 1;

            // Second priority: skill match count
            return b.skill_match_count - a.skill_match_count;
          })
        : formattedRows;

    console.log(sortedRows);
    return NextResponse.json(
      { job_posts: sortedRows },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      {
        status: 500,
      }
    );
  }
}
