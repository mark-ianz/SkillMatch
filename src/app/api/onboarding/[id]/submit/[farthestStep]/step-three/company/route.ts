import { formatZodError } from "@/lib/utils";
import { employerOnboardingStepThreeSchema } from "@/schema/onboarding";
import CompanyOnboardingService from "@/services/onboarding/onboarding.company.services";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: { id: string | undefined; farthestStep: number | undefined } }
) {
  const params = await context.params;
  const body = await req.json();

  // Validate ID parameter
  if (!params.id) {
    return NextResponse.json({ error: "Invalid or missing ID parameter" }, { status: 400 });
  }

  // Validate farthestStep parameter
  if (!params.farthestStep || isNaN(Number(params.farthestStep))) {
    return NextResponse.json({ error: "Invalid or missing farthestStep parameter" }, { status: 400 });
  }

  // Validate request body using employer schema
  const { data, success, error } = employerOnboardingStepThreeSchema.safeParse(body);
  if (!success) {
    return NextResponse.json({ error: formatZodError(error) }, { status: 422 });
  }

  try {
    await CompanyOnboardingService.submitStepThree(params.id, params.farthestStep, data);
    return NextResponse.json({ status: 204 });
  } catch (err) {
    console.error("Error submitting employer onboarding step three:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
