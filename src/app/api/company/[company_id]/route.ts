import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { CompanyProfile } from "@/types/company.types";
import { JobPost } from "@/types/job_post.types";

export async function GET(
  request: NextRequest,
  { params }: { params: { company_id: string } }
) {
  try {
    const { company_id } = params;

    if (!company_id) {
      return NextResponse.json(
        { success: false, message: "Company ID is required" },
        { status: 400 }
      );
    }

    // Fetch company profile (excluding private document paths)
    const [companyRows] = await db.query<RowDataPacket[]>(
      `SELECT 
        company_id,
        company_name,
        company_email,
        telephone_number,
        phone_number,
        city_municipality,
        barangay,
        date_founded,
        description,
        industry,
        company_image,
        website,
        facebook_page,
        instagram_page,
        twitter_page,
        created_at
      FROM company
      WHERE company_id = ?`,
      [company_id]
    );

    if (companyRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    const company_profile = {
      ...companyRows[0],
      industry: companyRows[0].industry
        ? companyRows[0].industry.split(",").map((ind: string) => ind.trim())
        : null,
    } as CompanyProfile;

    // Fetch all job posts for this company
    const [jobRows] = await db.query<RowDataPacket[]>(
      `SELECT 
        jp.*,
        c.company_name,
        c.company_image,
        c.industry,
        c.description,
        c.barangay,
        c.city_municipality
      FROM job_posts jp
      JOIN company c ON jp.company_id = c.company_id
      WHERE jp.company_id = ?
      ORDER BY jp.created_at DESC`,
      [company_id]
    );

    const job_posted = jobRows.map((row) => ({
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

    return NextResponse.json(
      {
        company_profile,
        job_posted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching company profile with jobs:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
