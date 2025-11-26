import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// POST - Send offer
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

    const { offer_deadline } = await request.json();

    if (!offer_deadline) {
      return NextResponse.json(
        { message: "Offer deadline is required" },
        { status: 400 }
      );
    }

    await ApplicationServices.sendOffer(application_id, offer_deadline);

    return NextResponse.json(
      { message: "Offer sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending offer:", error);
    return NextResponse.json(
      { message: "Failed to send offer" },
      { status: 500 }
    );
  }
}
