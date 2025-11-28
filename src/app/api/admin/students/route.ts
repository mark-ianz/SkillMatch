import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

// Get all students with their account status
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
        a.user_id,
        a.email,
        a.status_id,
        a.created_at as account_created_at,
        s.status as status_name,
        u.first_name,
        u.last_name,
        u.phone_number,
        u.city_municipality,
        op.course,
        op.year_level
      FROM account a
      LEFT JOIN user u ON a.user_id = u.user_id
      LEFT JOIN ojt_profile op ON a.user_id = op.user_id
      LEFT JOIN status s ON a.status_id = s.status_id
      WHERE a.role_id = 3
    `;

    const params: number[] = [];

    if (statusFilter && statusFilter !== "all") {
      query += " AND a.status_id = ?";
      params.push(parseInt(statusFilter));
    }

    query += " ORDER BY a.created_at DESC";

    const [students] = await db.query(query, params);

    // Map status to status_name for frontend
    const mappedStudents = Array.isArray(students)
      ? students.map((student: any) => ({
          ...student,
          status_name: student.status_name || "Unknown",
          full_name: student.first_name && student.last_name 
            ? `${student.first_name} ${student.last_name}`
            : "N/A",
        }))
      : [];

    return NextResponse.json(mappedStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
