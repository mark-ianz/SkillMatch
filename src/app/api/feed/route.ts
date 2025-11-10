import { db } from "@/lib/db";
import { JobPostQuery } from "@/types/job_post.types";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

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

    // Build dynamic WHERE clauses
    const conditions: string[] = [];
    const values: (string | number)[] = [];

    // Handle courses (comma-separated in DB, need to use FIND_IN_SET)
    if (courses.length > 0) {
      const courseConditions = courses.map(() => "FIND_IN_SET(?, jp.courses_required) > 0");
      conditions.push(`(${courseConditions.join(" OR ")})`);
      values.push(...courses);
    }

    if (locations.length > 0) {
      conditions.push(`jp.city_municipality IN (${locations.map(() => "?").join(",")})`);
      values.push(...locations);
    }

    if (arrangements.length > 0) {
      conditions.push(`jp.work_arrangement IN (${arrangements.map(() => "?").join(",")})`);
      values.push(...arrangements);
    }

    // Handle industries (company table, might be JSON array in DB)
    if (industries.length > 0) {
      const industryConditions = industries.map(() => "FIND_IN_SET(?, c.industry) > 0 OR JSON_CONTAINS(c.industry, JSON_QUOTE(?))");
      conditions.push(`(${industryConditions.join(" OR ")})`);
      industries.forEach(industry => {
        values.push(industry, industry);
      });
    }

    // Handle job categories (comma-separated in DB)
    if (jobCategories.length > 0) {
      const categoryConditions = jobCategories.map(() => "FIND_IN_SET(?, jp.job_categories) > 0");
      conditions.push(`(${categoryConditions.join(" OR ")})`);
      values.push(...jobCategories);
    }

    if (isPaid !== null) {
      conditions.push(`jp.is_paid = ?`);
      values.push(isPaid === "true" ? 1 : 0);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const [rows] = await db.query<(RowDataPacket & JobPostQuery)[]>(
      `
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
    `,
      values
    );

    const formattedRows = rows.map((post) => ({
      ...post,
      is_paid: Boolean(post.is_paid),
      job_responsibilities: post.job_responsibilities.split(","),
      courses_required: post.courses_required ? post.courses_required.split(",") : [],
      job_categories: post.job_categories ? post.job_categories.split(",") : [],
      soft_skills: post.soft_skills ? post.soft_skills.split(",") : [],
      technical_skills: post.technical_skills
        ? post.technical_skills.split(",")
        : [],
    }));

    return NextResponse.json(
      { job_posts: formattedRows },
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
