import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// POST - Reject application
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
    if (session.user.role_id !== 2) {
      return NextResponse.json(
        { message: "Access denied. Company role required." },
        { status: 403 }
      );
    }

    const application_id = parseInt(params.application_id);

    if (isNaN(application_id)) {
      return NextResponse.json(
        { message: "Invalid application ID" },
        { status: 400 }
      );
    }

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
