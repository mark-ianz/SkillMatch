import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

// Get all job posts with company info and status
export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    let query = `
      SELECT 
        jp.*,
        c.company_name,
        c.company_image,
        s.status as job_post_status
      FROM job_posts jp
      INNER JOIN company c ON jp.company_id = c.company_id
      LEFT JOIN status s ON jp.job_post_status_id = s.status_id
    `;

    const params: number[] = [];

    if (statusFilter && statusFilter !== "all") {
      query += " WHERE jp.job_post_status_id = ?";
      params.push(parseInt(statusFilter));
    }

    query += " ORDER BY jp.created_at DESC";

    const [jobPosts] = await db.query(query, params);

    // Parse comma-separated fields into arrays
    const parsedJobPosts = Array.isArray(jobPosts)
      ? jobPosts.map((job: any) => ({
          ...job,
          is_paid: Boolean(job.is_paid),
          job_post_status: job.job_post_status || job.status || "Unknown",
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
        }))
      : [];

    return NextResponse.json(parsedJobPosts);
  } catch (error) {
    console.error("Error fetching job posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch job posts" },
      { status: 500 }
    );
  }
}
