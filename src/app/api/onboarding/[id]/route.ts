import OnboardingApplicantServices from "@/services/onboarding/onboarding.applicant.services";
import { SkillServices } from "@/services/skill.services";
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

  const onboardingData = await OnboardingApplicantServices.getOnboarding(
    Number(params.id)
  );

  const skills = await SkillServices.getUserSkills(Number(params.id));

  if (!onboardingData) {
    return NextResponse.json(
      { error: "Onboarding data not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ...onboardingData, skills }, { status: 200 });
}
