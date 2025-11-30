import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import CompanyPostServices from "@/services/company-post.services";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    let userCourse: string | undefined;
    let companyIndustries: string[] | undefined;

    // Only apply custom algorithm if user is authenticated
    if (session?.user) {
      // If Applicant user, get their course from applicant_profile
      if (session.user.role_id === 3) {
        const [applicantRows] = await db.query<RowDataPacket[]>(
          `SELECT course FROM applicant_profile WHERE user_id = ?`,
          [session.user.user_id]
        );

        if (applicantRows && applicantRows.length > 0) {
          userCourse = applicantRows[0].course;
        }
      }

      // If Company user, get their industries
      if (session.user.role_id === 4) {
        const [companyRows] = await db.query<RowDataPacket[]>(
          `SELECT industry FROM company WHERE company_id = ?`,
          [session.user.user_id]
        );

        if (companyRows && companyRows.length > 0 && companyRows[0].industry) {
          companyIndustries = companyRows[0].industry.split(",").map((i: string) => i.trim());
        }
      }
    }

    // Get all posts (with custom algorithm if authenticated, without if public)
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
