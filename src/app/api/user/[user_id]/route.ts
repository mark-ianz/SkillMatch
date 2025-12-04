import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

// GET - Get user profile with Applicant profile data
export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    const { user_id } = params;

    if (!user_id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch user data with Applicant profile
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT 
        u.*,
        op.applicant_id,
        op.resume_path,
        op.visibility,
        op.skills,
        op.college,
        op.course,
        op.year_level,
        op.expected_graduation_year,
        op.required_hours,
        op.preferred_schedule,
        op.created_at as applicant_created_at
      FROM user u
      LEFT JOIN applicant_profile op ON u.user_id = op.user_id
      WHERE u.user_id = ?`,
      [user_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const userData = rows[0];

    // Process skills from comma-separated string to array
    const user = {
      ...userData,
      skills: userData.skills 
        ? userData.skills.split(",").map((skill: string) => skill.trim())
        : [],
    };

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
