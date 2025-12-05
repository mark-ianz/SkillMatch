import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";
import { jobPostingSchema } from "@/schema/job-posting.schema";

export async function PUT(
  req: NextRequest,
  { params }: { params: { job_posts_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || session.user.role_id !== 4) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { job_posts_id } = params;
    const body = await req.json();

    // Validate the request body
    const validationResult = jobPostingSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error },
        { status: 400 }
      );
    }

    // Verify the job post belongs to the company
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT company_id, job_post_status_id FROM job_posts WHERE job_post_id = ?",
      [job_posts_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Job post not found" },
        { status: 404 }
      );
    }

    if (rows[0].company_id !== session.user.company_id) {
      return NextResponse.json(
        { error: "Unauthorized to update this job post" },
        { status: 403 }
      );
    }

    const isRejected = rows[0].job_post_status_id === 3;

    const {
      job_title,
      courses_required,
      job_categories,
      available_positions,
      job_overview,
      job_responsibilities,
      preferred_qualifications,
      work_arrangement,
      soft_skills,
      technical_skills,
      street_name,
      barangay,
      city_municipality,
      postal_code,
    } = validationResult.data;

    // Update the job post
    await db.query<ResultSetHeader>(
      `UPDATE job_posts 
       SET job_title = ?,
           courses_required = ?,
           job_categories = ?,
           available_positions = ?,
           job_overview = ?,
           job_responsibilities = ?,
           preferred_qualifications = ?,
           work_arrangement = ?,
           soft_skills = ?,
           technical_skills = ?,
           street_name = ?,
           barangay = ?,
           city_municipality = ?,
           postal_code = ?,
           job_post_status_id = ?,
           rejected_reason = NULL,
           updated_at = NOW()
       WHERE job_post_id = ?`,
      [
        job_title,
        (courses_required || []).join(","),
        (job_categories || []).join(" / "),
        available_positions,
        job_overview,
        (job_responsibilities || []).join(","),
        preferred_qualifications || null,
        work_arrangement,
        (soft_skills || []).join(","),
        (technical_skills || []).join(","),
        street_name,
        barangay,
        city_municipality,
        postal_code,
        isRejected ? 2 : rows[0].job_post_status_id, // Change to pending (2) if was rejected (3)
        job_posts_id,
      ]
    );

    return NextResponse.json({
      message: isRejected 
        ? "Job post updated and resubmitted for approval" 
        : "Job post updated successfully",
      job_post_id: job_posts_id,
    });
  } catch (error) {
    console.error("Error updating job post:", error);
    return NextResponse.json(
      { error: "Failed to update job post" },
      { status: 500 }
    );
  }
}
