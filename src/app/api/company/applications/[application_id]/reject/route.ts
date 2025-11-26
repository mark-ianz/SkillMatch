import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";
import { verifyCompanySession, verifyApplicationOwnership } from "@/middleware/company-auth.middleware";

// POST - Reject application
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

    const { rejection_reason } = await request.json();

    await ApplicationServices.rejectApplication(
      application_id,
      rejection_reason
    );

    return NextResponse.json(
      { message: "Application rejected successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error rejecting application:", error);
    return NextResponse.json(
      { message: "Failed to reject application" },
      { status: 500 }
    );
  }
}
