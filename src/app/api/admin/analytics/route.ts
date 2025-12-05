import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type CountResult = {
  count: number;
};

type CountResultQuery = (CountResult & RowDataPacket)[];

type CourseCountResult = CountResult & {
  course: string;
};

type CourseCountResultQuery = CourseCountResult & RowDataPacket[];

// Get analytics data
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    console.log({ session });
    // Check if user is admin (role_id 2)
    if (!session || session.user.role_id !== 2) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeFrame = searchParams.get("timeFrame") || "today"; // today, week, month, all

    // Determine date filter based on timeFrame
    let dateFilter = "";
    switch (timeFrame) {
      case "today":
        dateFilter = "DATE(created_at) = CURDATE()";
        break;
      case "week":
        dateFilter = "created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
        break;
      case "month":
        dateFilter = "created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
        break;
      case "all":
        dateFilter = "1=1"; // No date restriction
        break;
      default:
        dateFilter = "1=1";
    }

    // Get applicant count (role_id = 3)
    const [applicantResult] = await db.query<CountResultQuery>(
      `SELECT COUNT(*) as count 
       FROM account 
       WHERE role_id = 3 AND ${dateFilter}`
    );
    const applicantCount = Array.isArray(applicantResult)
      ? applicantResult[0]?.count || 0
      : 0;

    // Get company count (role_id = 4)
    const [companyResult] = await db.query<CountResultQuery>(
      `SELECT COUNT(*) as count 
       FROM account 
       WHERE role_id = 4 AND ${dateFilter}`
    );
    const companyCount = Array.isArray(companyResult)
      ? companyResult[0]?.count || 0
      : 0;

    // Get job post count
    const [jobPostResult] = await db.query<CountResultQuery>(
      `SELECT COUNT(*) as count 
       FROM job_posts 
       WHERE ${dateFilter}`
    );
    const jobPostCount = Array.isArray(jobPostResult)
      ? jobPostResult[0]?.count || 0
      : 0;

    // Get courses distribution from applicant_profile
    const [coursesResult] = await db.query<CourseCountResultQuery[]>(
      `SELECT op.course, COUNT(*) as count 
       FROM applicant_profile op
       INNER JOIN account a ON op.user_id = a.user_id
       WHERE a.role_id = 3 ${
         timeFrame !== "all"
           ? `AND ${dateFilter.replace("created_at", "a.created_at")}`
           : ""
       }
       GROUP BY op.course
       ORDER BY count DESC`
    );

    const coursesData = Array.isArray(coursesResult)
      ? coursesResult.map((row, index: number) => ({
          course: row.course || "Unknown",
          count: row.count || 0,
          fill: `var(--chart-${(index % 5) + 1})`,
        }))
      : [];

    // Get industry distribution from company table
    const [companiesResult] = await db.query<({ industry: string } & RowDataPacket)[]>(
      `SELECT industry 
       FROM company c
       INNER JOIN account a ON c.company_id = a.company_id
       WHERE a.role_id = 4 ${
         timeFrame !== "all"
           ? `AND ${dateFilter.replace("created_at", "a.created_at")}`
           : ""
       }`
    );

    // Process industry data (split comma-separated values and count)
    const industryMap = new Map<string, number>();

    if (Array.isArray(companiesResult)) {
      companiesResult.forEach((row) => {
        if (row.industry) {
          const industries = row.industry
            .split(",")
            .map((ind: string) => ind.trim());
          industries.forEach((industry: string) => {
            if (industry) {
              industryMap.set(industry, (industryMap.get(industry) || 0) + 1);
            }
          });
        }
      });
    }

    const industriesData = Array.from(industryMap.entries())
      .map(([industry, count], index) => ({
        industry,
        count,
        fill: `var(--chart-${(index % 5) + 1})`,
      }))
      .sort((a, b) => b.count - a.count);

    // Get job post status distribution
    const [jobPostStatusResult] = await db.query<(
      { status: string; count: number } & RowDataPacket
    )[]>(
      `SELECT s.status, COUNT(*) as count
       FROM job_posts jp
       INNER JOIN status s ON jp.job_post_status_id = s.status_id
       WHERE ${timeFrame !== "all" ? dateFilter : "1=1"}
       GROUP BY jp.job_post_status_id, s.status
       ORDER BY count DESC`
    );

    const jobPostStatusesData = Array.isArray(jobPostStatusResult)
      ? jobPostStatusResult.map((row, index: number) => ({
          status: row.status || "Unknown",
          count: row.count || 0,
          fill: `var(--chart-${(index % 5) + 1})`,
        }))
      : [];

    return NextResponse.json({
      applicants: applicantCount,
      companies: companyCount,
      jobPosts: jobPostCount,
      courses: coursesData,
      industries: industriesData,
      jobPostStatuses: jobPostStatusesData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
