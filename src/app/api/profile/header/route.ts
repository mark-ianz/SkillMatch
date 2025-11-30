import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { UserService } from "@/services/user.services";
import { CompanyServices } from "@/services/company.services";

// GET - Fetch profile data for header
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "applicant" or "company"

    if (type === "applicant") {
      const userId = session.user.user_id;
      if (!userId) {
        return NextResponse.json(
          { message: "User ID not found" },
          { status: 400 }
        );
      }

      const profile = await UserService.getApplicantProfileForHeader(userId);
      
      if (!profile) {
        return NextResponse.json(
          { message: "Profile not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        avatarUrl: profile.applicant_image_path,
        name: `${profile.first_name} ${profile.last_name}`,
        email: profile.email,
      }, { status: 200 });
      
    } else if (type === "company") {
      const companyId = session.user.company_id as string;
      if (!companyId) {
        return NextResponse.json(
          { message: "Company ID not found" },
          { status: 400 }
        );
      }

      const profile = await CompanyServices.getCompanyProfileForHeader(companyId);
      
      if (!profile) {
        return NextResponse.json(
          { message: "Profile not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        avatarUrl: profile.company_image,
        name: profile.company_name,
        email: profile.email,
      }, { status: 200 });
      
    } else {
      return NextResponse.json(
        { message: "Invalid type parameter. Use 'applicant' or 'company'" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
