import { db } from "@/lib/db";
import { JobPostQuery } from "@/types/job_post.types";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query<(RowDataPacket & JobPostQuery)[]>(`
      SELECT
        c.company_name,
        c.company_image,
        c.website,
        c.facebook_page,
        c.company_email,
        jp.*,
        GROUP_CONCAT(s.skill_name SEPARATOR ',') AS technical_skills
      FROM job_posts jp
      JOIN company c ON jp.company_id = c.company_id
      JOIN job_post_skills jps ON jp.job_post_id = jps.job_post_id
      JOIN skill s ON jps.skill_id = s.skill_id
      GROUP BY jp.job_post_id
      ORDER BY jp.created_at DESC;
    `);

    const formattedRows = rows.map((post) => ({
      ...post,
      is_paid: Boolean(post.is_paid),
      job_responsibilities: post.job_responsibilities.split(","),
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
    return (
      NextResponse.json({ success: false, message: "Server error" }),
      {
        status: 500,
      }
    );
  }
}
