import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// GET - Get single application details
export async function GET(
  request: NextRequest,
  { params }: { params: { application_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const application_id = parseInt(params.application_id);

    if (isNaN(application_id)) {
      return NextResponse.json(
        { message: "Invalid application ID" },
        { status: 400 }
      );
    }

    const application = await ApplicationServices.getApplicationById(
      application_id,
      session.user.user_id
    );

    if (!application) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { message: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

// DELETE - Withdraw application
export async function DELETE(
  request: NextRequest,
  { params }: { params: { application_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const application_id = parseInt(params.application_id);

    if (isNaN(application_id)) {
      return NextResponse.json(
        { message: "Invalid application ID" },
        { status: 400 }
      );
    }

    await ApplicationServices.withdrawApplication(
      application_id,
      session.user.user_id
    );

    return NextResponse.json(
      { message: "Application withdrawn successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error withdrawing application:", error);
    return NextResponse.json(
      { message: "Failed to withdraw application" },
      { status: 500 }
    );
  }
}
