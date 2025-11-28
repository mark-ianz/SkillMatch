import { NextResponse } from "next/server";
import { JobPostingServices } from "@/services/job-posting.services";

export async function GET() {
  try {
    const jobPosts = await JobPostingServices.getAllJobPosts();
    return NextResponse.json({ job_posts: jobPosts }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch job posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch job posts" },
      { status: 500 }
    );
  }
}