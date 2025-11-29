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
    const { company_name, description, industry, date_founded } = body;

    console.log({ company_name, description, industry, date_founded })
    if (!company_name || !description || !industry || industry.length === 0) {
      return NextResponse.json(
        { message: "Company name, description, and at least one industry are required" },
        { status: 400 }
      );
    }

    await CompanySettingsServices.updateCompanyProfile(
      session.user.company_id,
      { company_name, description, industry, date_founded }
    );

    return NextResponse.json(
      { message: "Company profile updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating company profile:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update company profile" },
      { status: error.statusCode || 500 }
    );
  }
}
