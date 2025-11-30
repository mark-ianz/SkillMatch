import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { ApplicantProfileAndUser } from "@/types/applicant_profile.types";
import { RowDataPacket } from "mysql2";

// Get all applicants with their account status
export async function GET() {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let query = `
      SELECT 
        a.user_id,
        a.email,
        a.created_at,
        u.first_name,
        u.last_name,
        u.phone_number,
        u.barangay,
        u.city_municipality,
        op.course,
        op.student_number,
        op.year_level,
        op.required_hours,
        op.preferred_schedule,
        op.applicant_image_path
      FROM account a
      LEFT JOIN user u ON a.user_id = u.user_id
      LEFT JOIN applicant_profile op ON a.user_id = op.user_id
      WHERE a.role_id = 3
    `;

    const params: number[] = [];

    query += " ORDER BY a.created_at DESC";

    const [applicants] = await db.query<
      (ApplicantProfileAndUser & RowDataPacket)[]
    >(query, params);

    return NextResponse.json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return NextResponse.json(
      { error: "Failed to fetch applicants" },
      { status: 500 }
    );
  }
}
