import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import { JobPostQuery } from "@/types/job_post.types";
import { Status } from "@/types/status.types";

// Update job post status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ job_post_id: string }> }
) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { job_post_id } = await params;
    const { job_post_status_id, rejected_reason } = await request.json();

    // Validate job_post_status_id - Job post statuses: 1=active, 2=pending, 3=rejected, 4=disabled, 5=filled, 6=closed
    if (!job_post_status_id || ![1, 2, 3, 4, 5, 6].includes(job_post_status_id)) {
      return NextResponse.json(
        { error: "Invalid job_post_status_id" },
        { status: 400 }
      );
    }

    // If status is rejected (3), require rejection reason
    if (job_post_status_id === 3 && (!rejected_reason || !rejected_reason.trim())) {
      return NextResponse.json(
        { error: "Rejection reason is required when rejecting a job post" },
        { status: 400 }
      );
    }

    // Update job post status and rejected_reason
    await db.query(
      "UPDATE job_posts SET job_post_status_id = ?, rejected_reason = ?, updated_at = NOW() WHERE job_post_id = ?",
      [job_post_status_id, job_post_status_id === 3 ? rejected_reason : null, job_post_id]
    );

    return NextResponse.json({
      success: true,
      message: "Job post status updated successfully",
    });
  } catch (error) {
    console.error("Error updating job post status:", error);
    return NextResponse.json(
      { error: "Failed to update job post status" },
      { status: 500 }
    );
  }
}

// Get single job post details
export async function GET(
  request: NextRequest,
  { params }: { params: { job_post_id: string } }
) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { job_post_id } = params;

    const [jobPosts] = await db.query(
      `
      SELECT 
        jp.*,
        c.company_name,
        c.company_image,
        c.company_email,
        s.status
      FROM job_posts jp
      INNER JOIN company c ON jp.company_id = c.company_id
      LEFT JOIN status s ON jp.job_post_status_id = s.status_id
      WHERE jp.job_post_id = ?
      `,
      [job_post_id]
    );

    if (!Array.isArray(jobPosts) || jobPosts.length === 0) {
      return NextResponse.json(
        { error: "Job post not found" },
        { status: 404 }
      );
    }

    const job = jobPosts[0] as JobPostQuery & Status;
    const parsedJob = {
      ...job,
      job_post_status: job.status || "Unknown",
      job_responsibilities: job.job_responsibilities
        ? job.job_responsibilities.split(",")
        : [],
      courses_required: job.courses_required
        ? job.courses_required.split(",")
        : [],
      job_categories: job.job_categories
        ? job.job_categories.split(",")
        : [],
      soft_skills: job.soft_skills ? job.soft_skills.split(",") : [],
      technical_skills: job.technical_skills
        ? job.technical_skills.split(",")
        : [],
    };

    return NextResponse.json(parsedJob);
  } catch (error) {
    console.error("Error fetching job post:", error);
    return NextResponse.json(
      { error: "Failed to fetch job post" },
      { status: 500 }
    );
  }
}
