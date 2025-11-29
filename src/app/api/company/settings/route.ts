import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { CompanySettingsServices } from "@/services/company-settings.services";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.company_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const settings = await CompanySettingsServices.getCompanySettings(
      session.user.company_id
    );

    return NextResponse.json(settings, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching company settings:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch company settings" },
      { status: error.statusCode || 500 }
    );
  }
}
