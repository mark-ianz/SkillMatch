import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// GET - Get all applications for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const applications = await ApplicationServices.getUserApplications(
      session.user.user_id
    );

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST - Apply to a job
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { job_post_id, resume_path } = await request.json();

    if (!job_post_id) {
      return NextResponse.json(
        { message: "Job post ID is required" },
        { status: 400 }
      );
    }

    // Check if already applied
    const hasApplied = await ApplicationServices.hasUserApplied(
      session.user.user_id,
      job_post_id
    );

    if (hasApplied) {
      return NextResponse.json(
        { message: "You have already applied to this job" },
        { status: 409 }
      );
    }

    const application = await ApplicationServices.applyToJob(
      session.user.user_id,
      job_post_id,
      resume_path
    );

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error applying to job:", error);
    return NextResponse.json(
      { message: "Failed to apply to job" },
      { status: 500 }
    );
  }
}
