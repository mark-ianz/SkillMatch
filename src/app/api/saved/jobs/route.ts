import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import SavedItemsServices from "@/services/saved-items.services";

// GET - Get all saved jobs
export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const savedJobs = await SavedItemsServices.getSavedJobs(
      session.user.user_id.toString()
    );

    return NextResponse.json({ savedJobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch saved jobs" },
      { status: 500 }
    );
  }
}

// POST - Save a job
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { job_post_id } = await request.json();

    if (!job_post_id) {
      return NextResponse.json(
        { message: "Job post ID is required" },
        { status: 400 }
      );
    }

    const result = await SavedItemsServices.saveJob(
      session.user.user_id.toString(),
      job_post_id
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { message: "Failed to save job" },
      { status: 500 }
    );
  }
}

// DELETE - Unsave a job
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const job_post_id = searchParams.get("job_post_id");

    if (!job_post_id) {
      return NextResponse.json(
        { message: "Job post ID is required" },
        { status: 400 }
      );
    }

    const result = await SavedItemsServices.unsaveJob(
      session.user.user_id.toString(),
      job_post_id
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error unsaving job:", error);
    return NextResponse.json(
      { message: "Failed to unsave job" },
      { status: 500 }
    );
  }
}
