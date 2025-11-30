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

    // Fetch user skills and course if Applicant user
    let userSkills: string[] = [];
    let userCourse: string | null = null;
    if (userId && roleName === "Applicant") {
      try {
        const [profileRows] = await db.query<
          (RowDataPacket & { skills: string | null; course: string | null })[]
        >(`SELECT skills, course FROM applicant_profile WHERE user_id = ?`, [userId]);

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
    const conditions: string[] = ["jp.job_post_status_id = 1"]; // Only show active posts
    const values: (string | number)[] = [];

    // Handle courses - optimized to avoid FIND_IN_SET on every row
    if (courses.length > 0) {
      const courseConditions = courses.map(() => "jp.courses_required LIKE ?");
      conditions.push(`(${courseConditions.join(" OR ")})`);
      courses.forEach(course => values.push(`%${course}%`));
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

    // Handle industries - optimized
    if (industries.length > 0) {
      const industryConditions = industries.map(() => "c.industry LIKE ?");
      conditions.push(`(${industryConditions.join(" OR ")})`);
      industries.forEach((industry) => values.push(`%${industry}%`));
    }

    // Handle job categories - optimized
    if (jobCategories.length > 0) {
      const categoryConditions = jobCategories.map(() => "jp.job_categories LIKE ?");
      conditions.push(`(${categoryConditions.join(" OR ")})`);
      jobCategories.forEach(cat => values.push(`%${cat}%`));
    }

    if (isPaid !== null && isPaid !== undefined) {
      conditions.push(`jp.is_paid = ?`);
      values.push(isPaid === "true" ? 1 : 0);
    }

    // Handle search query - optimized with indexed columns first
    if (search && search.trim()) {
      const searchTerm = `%${search.trim()}%`;
      conditions.push(`(
        jp.job_title LIKE ? OR 
        c.company_name LIKE ? OR 
        jp.job_overview LIKE ?
      )`);
      values.push(searchTerm, searchTerm, searchTerm);
    }

    const whereClause = `WHERE ${conditions.join(" AND ")}`;

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
      ORDER BY jp.created_at DESC
      LIMIT 500;
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

      // Calculate skill match count for Applicant users
      let matchCount = 0;
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

    // Sort by course match and skill match count if Applicant user
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
