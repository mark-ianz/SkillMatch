import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// GET - Get all applications for a job post (Company only)
export async function GET(
  request: NextRequest,
  { params }: { params: { job_post_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a company
    if (session.user.role_id !== 4) {
      return NextResponse.json(
        { message: "Access denied. Company role required." },
        { status: 403 }
      );
    }

    const { job_post_id } = params;

    const applications = await ApplicationServices.getJobPostApplications(
      job_post_id
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
