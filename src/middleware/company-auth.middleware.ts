import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

/**
 * Verify that the session user is a company with the given company_id
 */
export function verifyCompanySession(session: Session | null) {
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role_id !== 4) {
    return NextResponse.json(
      { message: "Access denied. Company role required." },
      { status: 403 }
    );
  }

  if (!session.user.company_id) {
    return NextResponse.json(
      { message: "Company ID not found in session" },
      { status: 403 }
    );
  }

  return null; // No error
}

/**
 * Verify that the application belongs to the company
 */
export async function verifyApplicationOwnership(
  application_id: string,
  company_id: string
): Promise<NextResponse | null> {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT jp.company_id 
       FROM applications a
       JOIN job_posts jp ON a.job_post_id = jp.job_post_id
       WHERE a.application_id = ?`,
      [application_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    if (rows[0].company_id !== company_id) {
      return NextResponse.json(
        { message: "Access denied. You can only manage applications for your own job posts." },
        { status: 403 }
      );
    }

    return null; // No error, ownership verified
  } catch (error) {
    console.error("Error verifying application ownership:", error);
    return NextResponse.json(
      { message: "Failed to verify ownership" },
      { status: 500 }
    );
  }
}

/**
 * Verify that the job post belongs to the company
 */
export async function verifyJobPostOwnership(
  job_post_id: string,
  company_id: string
): Promise<NextResponse | null> {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT company_id FROM job_posts WHERE job_post_id = ?`,
      [job_post_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Job post not found" },
        { status: 404 }
      );
    }

    if (rows[0].company_id !== company_id) {
      return NextResponse.json(
        { message: "Access denied. You can only manage your own job posts." },
        { status: 403 }
      );
    }

    return null; // No error, ownership verified
  } catch (error) {
    console.error("Error verifying job post ownership:", error);
    return NextResponse.json(
      { message: "Failed to verify ownership" },
      { status: 500 }
    );
  }
}
