import CompanyOnboardingService from "@/services/onboarding/onboarding.company.services";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: { id: string | undefined } }
) {
  const params = await context.params;

  if (!params.id || isNaN(Number(params.id))) {
    return NextResponse.json(
      { error: "Invalid or missing ID parameter" },
      { status: 400 }
    );
  }

  const onboardingData = await CompanyOnboardingService.getOnboardingCompany(
    params.id
  );

  if (!onboardingData) {
    return NextResponse.json(
      { error: "Onboarding data not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(onboardingData, { status: 200 });
}
