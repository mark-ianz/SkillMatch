import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import { ApplicantProfileAndUser } from "@/types/applicant_profile.types";
import { Status } from "@/types/status.types";

// Get single student details
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user_id } = params;

    const [applicants] = await db.query(
      `
      SELECT 
        a.user_id,
        a.email,
        a.status_id,
        a.created_at as account_created_at,
        s.status,
        u.first_name,
        u.middle_name,
        u.last_name,
        u.gender,
        u.birthdate,
        u.street_name,
        u.house_number,
        u.subdivision,
        u.postal_code,
        u.barangay,
        u.city_municipality,
        u.region,
        u.phone_number,
        op.course,
        op.year_level,
        op.required_hours
      FROM account a
      LEFT JOIN user u ON a.user_id = u.user_id
      LEFT JOIN applicant_profile op ON a.user_id = op.user_id
      LEFT JOIN status s ON a.status_id = s.status_id
      WHERE a.user_id = ? AND a.role_id = 3
      `,
      [user_id]
    );

    if (!Array.isArray(applicants) || applicants.length === 0) {
      return NextResponse.json(
        { error: "Applicant not found" },
        { status: 404 }
      );
    }

    const student = applicants[0] as ApplicantProfileAndUser & Status;
    return NextResponse.json({
      ...student,
      status_name: student.status || "Unknown",
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

// Update student status and basic info
export async function PATCH(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user_id } = params;
    const body = await request.json();
    const { status_id, first_name, last_name, course, year_level, required_hours } = body;

    // Update account status if provided
    if (status_id) {
      // Validate status_id - Account statuses: 1=active, 2=pending, 3=rejected, 4=disabled, 7=onboarding
      if (![1, 2, 3, 4, 7].includes(status_id)) {
        return NextResponse.json(
          { error: "Invalid status_id" },
          { status: 400 }
        );
      }

      await db.query(
        "UPDATE account SET status_id = ? WHERE user_id = ?",
        [status_id, user_id]
      );
    }

    // Update user table if personal info provided
    if (first_name || last_name) {
      const updates: string[] = [];
      const values: (string | number)[] = [];

      if (first_name) {
        updates.push("first_name = ?");
        values.push(first_name);
      }
      if (last_name) {
        updates.push("last_name = ?");
        values.push(last_name);
      }

      if (updates.length > 0) {
        values.push(user_id);
        await db.query(
          `UPDATE user SET ${updates.join(", ")} WHERE user_id = ?`,
          values
        );
      }
    }

    // Update applicant_profile if Applicant-specific info provided
    if (course || year_level || required_hours) {
      const updates: string[] = [];
      const values: (string | number)[] = [];

      if (course) {
        updates.push("course = ?");
        values.push(course);
      }
      if (year_level) {
        updates.push("year_level = ?");
        values.push(year_level);
      }
      if (required_hours) {
        updates.push("required_hours = ?");
        values.push(required_hours);
      }

      if (updates.length > 0) {
        values.push(user_id);
        await db.query(
          `UPDATE applicant_profile SET ${updates.join(", ")} WHERE user_id = ?`,
          values
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Applicant updated successfully",
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}
