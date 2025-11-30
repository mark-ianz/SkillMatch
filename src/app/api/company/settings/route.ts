import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { CompanySettingsServices } from "@/services/company-settings.services";
import { ServiceError } from "@/lib/errors";

export async function GET() {
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
  } catch (error: ServiceError | unknown) {
    console.error("Error fetching company settings:", error);
    return NextResponse.json(
      { message: error instanceof ServiceError ? error.message : "Failed to fetch company settings" },
      { status: error instanceof ServiceError ? error.status : 500 }
    );
  }
}
