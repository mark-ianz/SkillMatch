import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { job_posts_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || session.user.role_id !== 4) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { job_posts_id } = params;
    const { status_id } = await req.json();

    // Validate status_id (1 = active, 4 = disabled, 5 = filled, 6 = closed)
    if (![1, 4, 5, 6].includes(status_id)) {
      return NextResponse.json(
        { error: "Invalid status_id. Use 1 (active), 4 (disabled), 5 (filled), or 6 (closed)" },
        { status: 400 }
      );
    }

    // Verify the job post belongs to the company
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT company_id FROM job_posts WHERE job_post_id = ?",
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

    // Update the job post status
    await db.query<ResultSetHeader>(
      "UPDATE job_posts SET job_post_status_id = ?, updated_at = NOW() WHERE job_post_id = ?",
      [status_id, job_posts_id]
    );

    return NextResponse.json({
      message: "Job post status updated successfully",
      job_post_id: job_posts_id,
      status_id,
    });
  } catch (error) {
    console.error("Error updating job post status:", error);
    return NextResponse.json(
      { error: "Failed to update job post status" },
      { status: 500 }
    );
  }
}
