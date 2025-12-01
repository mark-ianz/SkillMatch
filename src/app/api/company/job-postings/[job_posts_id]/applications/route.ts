import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";
import { verifyCompanySession, verifyJobPostOwnership } from "@/middleware/company-auth.middleware";

// GET - Get all applications for a job post (Company only)
export async function GET(
  request: NextRequest,
  { params }: { params: { job_posts_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    // Verify company session
    const sessionError = verifyCompanySession(session);
    if (sessionError) return sessionError;

    const company_id = session!.user!.company_id!;
    const { job_posts_id } = params;

    // Verify job post ownership
    const ownershipError = await verifyJobPostOwnership(job_posts_id, company_id);
    if (ownershipError) return ownershipError;

    const applications = await ApplicationServices.getJobPostApplications(
      job_posts_id
    );

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job post applications:", error);
    return NextResponse.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
