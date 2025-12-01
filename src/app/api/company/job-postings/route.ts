import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// GET - Get all job posts for a company with application statistics
export async function GET() {
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

    // Get company_id from session (companies have company_id, not user_id)
    const company_id = session.user.company_id;

    if (!company_id) {
      return NextResponse.json(
        { message: "Company ID not found in session" },
        { status: 400 }
      );
    }

    const jobPosts = await ApplicationServices.getCompanyJobPostsWithStats(
      company_id
    );

    return NextResponse.json({ jobPosts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching company job posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch job posts" },
      { status: 500 }
    );
  }
}
