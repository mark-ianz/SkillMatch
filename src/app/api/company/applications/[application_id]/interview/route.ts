import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// POST - Schedule interview
export async function POST(
  request: NextRequest,
  { params }: { params: { application_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a company
    if (session.user.role_id !== 4) {
      return NextResponse.json(
        { message: "Access denied. Company role required." },
        { status: 403 }
      );
    }

    const application_id = params.application_id;

    if (!application_id) {
      return NextResponse.json(
        { message: "Invalid application ID" },
        { status: 400 }
      );
    }

    const {
      interview_date,
      interview_type,
      interview_link,
      interview_code,
      interview_notes,
    } = await request.json();

    if (!interview_date || !interview_type) {
      return NextResponse.json(
        { message: "Interview date and type are required" },
        { status: 400 }
      );
    }

    await ApplicationServices.scheduleInterview(
      application_id,
      interview_date,
      interview_type,
      interview_link,
      interview_code,
      interview_notes
    );

    return NextResponse.json(
      { message: "Interview scheduled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error scheduling interview:", error);
    return NextResponse.json(
      { message: "Failed to schedule interview" },
      { status: 500 }
    );
  }
}
