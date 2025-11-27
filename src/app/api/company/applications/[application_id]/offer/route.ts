import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";
import { verifyCompanySession, verifyApplicationOwnership } from "@/middleware/company-auth.middleware";

// POST - Select applicant
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

    const { offer_deadline } = await request.json();

    if (!offer_deadline) {
      return NextResponse.json(
        { message: "Offer deadline is required" },
        { status: 400 }
      );
    }

    await ApplicationServices.selectApplicant(application_id, offer_deadline);

    return NextResponse.json(
      { message: "Applicant selected successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error selecting applicant:", error);
    return NextResponse.json(
      { message: "Failed to select applicant" },
      { status: 500 }
    );
  }
}
