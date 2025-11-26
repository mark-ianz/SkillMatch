import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// PATCH - Update company status
export async function PATCH(
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
