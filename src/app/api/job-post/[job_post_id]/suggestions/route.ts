import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { JobPost } from "@/types/job_post.types";

export async function GET(
  request: NextRequest,
  { params }: { params: { job_post_id: string } }
) {
  try {
    const { job_post_id } = params;

    if (!job_post_id) {
      return NextResponse.json(
        { success: false, message: "Job post ID is required" },
        { status: 400 }
      );
    }

    // First, get the current job post to extract categories and courses
    const [currentJobRows] = await db.query<RowDataPacket[]>(
      `SELECT job_categories, courses_required FROM job_posts WHERE job_post_id = ?`,
      [job_post_id]
    );

    if (currentJobRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Job post not found" },
        { status: 404 }
      );
    }

    const currentJob = currentJobRows[0];
    const categories = currentJob.job_categories ? currentJob.job_categories.split(",").map((c: string) => c.trim()) : [];
    const courses = currentJob.courses_required ? currentJob.courses_required.split(",").map((c: string) => c.trim()) : [];

    // Build dynamic WHERE clauses for LIKE searches
    const conditions: string[] = [];
    const values: string[] = [];

    // Add category conditions
    categories.forEach((category: string) => {
      conditions.push("jp.job_categories LIKE ?");
      values.push(`%${category}%`);
    });

    // Add course conditions
    courses.forEach((course: string) => {
      conditions.push("jp.courses_required LIKE ?");
      values.push(`%${course}%`);
    });

    if (conditions.length === 0) {
      // No criteria to match, return empty suggestions
      return NextResponse.json({ suggestions: [] }, { status: 200 });
    }

    const whereClause = `(${conditions.join(" OR ")}) AND jp.job_post_id != ?`;
    values.push(job_post_id);

    // Fetch suggestions
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT 
        jp.job_post_id,
        jp.company_id,
        jp.job_title,
        jp.courses_required,
        jp.job_categories,
        jp.available_positions,
        jp.job_overview,
        jp.job_responsibilities,
        jp.preferred_qualifications,
        jp.work_arrangement,
        jp.is_paid,
        jp.allowance_description,
        jp.soft_skills,
        jp.technical_skills,
        jp.created_at,
        jp.updated_at,
        c.company_name,
        c.company_image,
        c.industry,
        c.description,
        c.barangay,
        c.city
      FROM job_posts jp
      JOIN company c ON jp.company_id = c.company_id
      WHERE ${whereClause}
      ORDER BY jp.created_at DESC
      LIMIT 10`,
      values
    );

    const suggestions = rows.map((row) => ({
      ...row,
      courses_required: row.courses_required
        ? row.courses_required.split(",").map((course: string) => course.trim())
        : [],
      job_categories: row.job_categories
        ? row.job_categories.split(",").map((cat: string) => cat.trim())
        : [],
      job_responsibilities: row.job_responsibilities
        ? row.job_responsibilities.split(",").map((resp: string) => resp.trim())
        : [],
      soft_skills: row.soft_skills
        ? row.soft_skills.split(",").map((skill: string) => skill.trim())
        : [],
      technical_skills: row.technical_skills
        ? row.technical_skills.split(",").map((skill: string) => skill.trim())
        : [],
      industry: row.industry
        ? row.industry.split(",").map((ind: string) => ind.trim())
        : null,
    })) as JobPost[];

    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job suggestions:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
