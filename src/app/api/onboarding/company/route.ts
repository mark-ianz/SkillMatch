import { authConfig } from "@/lib/auth";
import CompanyOnboardingService from "@/services/onboarding/onboarding.company.services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authConfig);

  console.log({ company:session });

  // Check if user is logged in
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const company_id = session.user.company_id;

  if (!company_id) {
    return NextResponse.json(
      { error: "Company ID not found in session" },
      { status: 400 }
    );
  }

  const onboardingData = await CompanyOnboardingService.getOnboardingCompany(
    company_id
  );

  if (!onboardingData) {
    return NextResponse.json(
      { error: "Onboarding data not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(onboardingData, { status: 200 });
}
