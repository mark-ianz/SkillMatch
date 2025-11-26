import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";
import { verifyCompanySession, verifyApplicationOwnership } from "@/middleware/company-auth.middleware";

// PATCH - Update company status
export async function PATCH(
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

    const { company_status_id, company_notes } = await request.json();

    if (!company_status_id) {
      return NextResponse.json(
        { message: "Company status ID is required" },
        { status: 400 }
      );
    }

    await ApplicationServices.updateCompanyStatus(
      application_id,
      company_status_id,
      company_notes
    );

    return NextResponse.json(
      { message: "Application status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { message: "Failed to update application status" },
      { status: 500 }
    );
  }
}
