import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";
import { verifyCompanySession, verifyApplicationOwnership } from "@/middleware/company-auth.middleware";

// POST - Schedule interview
export async function POST(
  request: NextRequest,
  { params }: { params: { application_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    // Verify company session
    const sessionError = verifyCompanySession(session);
    if (sessionError) return sessionError;

    const company_id = session!.user!.company_id!;

    const application_id = params.application_id;

    if (!application_id) {
      return NextResponse.json(
        { message: "Invalid application ID" },
        { status: 400 }
      );
    }

    // Verify application ownership
    const ownershipError = await verifyApplicationOwnership(
      application_id,
      company_id
    );
    if (ownershipError) return ownershipError;

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
