import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import CompanyPostServices from "@/services/company-post.services";
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

    let userCourse: string | undefined;
    let companyIndustries: string[] | undefined;

    // If OJT user, get their course from ojt_profile
    if (session.user.role_id === 3) {
      const [ojtRows] = await db.query<RowDataPacket[]>(
        `SELECT course FROM ojt_profile WHERE user_id = ?`,
        [session.user.user_id]
      );

      if (ojtRows && ojtRows.length > 0) {
        userCourse = ojtRows[0].course;
      }
    }

    // If Company user, get their industries
    if (session.user.role_id === 2) {
      const [companyRows] = await db.query<RowDataPacket[]>(
        `SELECT industry FROM company WHERE company_id = ?`,
        [session.user.user_id]
      );

      if (companyRows && companyRows.length > 0 && companyRows[0].industry) {
        companyIndustries = companyRows[0].industry.split(",").map((i: string) => i.trim());
      }
    }

    const posts = await CompanyPostServices.getCompanyPostsFeed(userCourse, companyIndustries);

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching company posts feed:", error);
    return NextResponse.json(
      { message: "Failed to fetch company posts" },
      { status: 500 }
    );
  }
}
