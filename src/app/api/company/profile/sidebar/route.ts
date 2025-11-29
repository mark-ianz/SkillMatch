import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { CompanyServices } from "@/services/company.services";

// GET - Fetch company profile for sidebar
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const companyId = session.user.company_id as string;
    if (!companyId) {
      return NextResponse.json(
        { message: "Company ID not found" },
        { status: 400 }
      );
    }

    const profile = await CompanyServices.getCompanyProfileForSidebar(companyId);
    
    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error fetching company profile:", error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
