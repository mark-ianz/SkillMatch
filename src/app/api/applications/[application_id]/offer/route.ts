import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ApplicationServices } from "@/services/application.services";

// POST - Respond to offer (accept/decline)
export async function POST(
  request: NextRequest,
  { params }: { params: { application_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const application_id = params.application_id;

    if (!application_id) {
      return NextResponse.json(
        { message: "Invalid application ID" },
        { status: 400 }
      );
    }

    const { response } = await request.json();

    if (!response || !["accept", "decline"].includes(response)) {
      return NextResponse.json(
        { message: "Invalid response. Must be 'accept' or 'decline'" },
        { status: 400 }
      );
    }

    await ApplicationServices.respondToOffer(
      application_id,
      session.user.user_id,
      response
    );

    return NextResponse.json(
      { message: `Offer ${response}ed successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error responding to offer:", error);
    return NextResponse.json(
      { message: "Failed to respond to offer" },
      { status: 500 }
    );
  }
}
