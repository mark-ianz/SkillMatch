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
        c.city_municipality
      FROM job_posts jp
      JOIN company c ON jp.company_id = c.company_id
      WHERE jp.job_post_id = ?`,
      [job_post_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Job post not found" },
        { status: 404 }
      );
    }

    const jobPost = {
      ...rows[0],
      courses_required: rows[0].courses_required
        ? rows[0].courses_required.split(",").map((course: string) => course.trim())
        : [],
      job_categories: rows[0].job_categories
        ? rows[0].job_categories.split(",").map((cat: string) => cat.trim())
        : [],
      job_responsibilities: rows[0].job_responsibilities
        ? rows[0].job_responsibilities.split(",").map((resp: string) => resp.trim())
        : [],
      soft_skills: rows[0].soft_skills
        ? rows[0].soft_skills.split(",").map((skill: string) => skill.trim())
        : [],
      technical_skills: rows[0].technical_skills
        ? rows[0].technical_skills.split(",").map((skill: string) => skill.trim())
        : [],
      industry: rows[0].industry
        ? rows[0].industry.split(",").map((ind: string) => ind.trim())
        : null,
    } as JobPost;

    return NextResponse.json({ job_post: jobPost }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job post:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
