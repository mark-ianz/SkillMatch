import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { CompanySettingsServices } from "@/services/company-settings.services";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.company_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      phone_number,
      telephone_number,
      website,
      facebook_page,
      instagram_page,
      twitter_page,
    } = body;

    await CompanySettingsServices.updateContactInfo(session.user.company_id, {
      phone_number: phone_number || "",
      telephone_number: telephone_number || "",
      website: website || "",
      facebook_page: facebook_page || "",
      instagram_page: instagram_page || "",
      twitter_page: twitter_page || "",
    });

    return NextResponse.json(
      { message: "Contact information updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating contact information:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update contact information" },
      { status: error.statusCode || 500 }
    );
  }
}
