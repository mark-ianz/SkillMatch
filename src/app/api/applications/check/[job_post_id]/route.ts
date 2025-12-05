import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// GET - Check if user has applied to a specific job
export async function GET(
  request: NextRequest,
  { params }: { params: { job_post_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { job_post_id } = params;

    if (!job_post_id) {
      return NextResponse.json(
        { message: "Job post ID is required" },
        { status: 400 }
      );
    }

    const hasApplied = await ApplicationServices.hasUserApplied(
      session.user.user_id,
      job_post_id
    );

    return NextResponse.json({ hasApplied }, { status: 200 });
  } catch (error) {
    console.error("Error checking application status:", error);
    return NextResponse.json(
      { message: "Failed to check application status" },
      { status: 500 }
    );
  }
}
