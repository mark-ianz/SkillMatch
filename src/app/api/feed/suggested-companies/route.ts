import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import CompanyServices from "@/services/company.services";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    if (!(session?.user?.user_id || session?.user?.company_id)) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Only OJT users get suggested companies
    if (session.user.role_id !== 3) {
      return NextResponse.json([], { status: 200 });
    }

    // Get user's course
    const [userRows] = await db.query<RowDataPacket[]>(
      `SELECT course FROM ojt_profile WHERE user_id = ?`,
      [session.user.user_id]
    );

    if (!userRows || userRows.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const userCourse = userRows[0].course;
    const companies = await CompanyServices.getSuggestedCompaniesForOJT(userCourse);

    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error("Error fetching suggested companies:", error);
    return NextResponse.json(
      { message: "Failed to fetch suggested companies" },
      { status: 500 }
    );
  }
}
