import { NextRequest, NextResponse } from "next/server";
import { JobPostingServices } from "@/services/job-posting.services";

export async function GET(
  request: NextRequest,
  { params }: { params: { job_post_id: string } }
) {
  try {
    const { job_post_id } = params;
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const roleName = searchParams.get("roleName");

    if (!job_post_id) {
      return NextResponse.json(
        { success: false, message: "Job post ID is required" },
        { status: 400 }
      );
    }

    const suggestions = await JobPostingServices.getJobPostSuggestions(
      job_post_id,
      userId || undefined,
      roleName || undefined
    );

    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job suggestions:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
