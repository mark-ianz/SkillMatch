import { formatZodError } from "@/lib/utils";
import {
  onboardingStepOneSchema,
} from "@/schema/onboarding";
import { OnboardingService } from "@/services/onboarding.services";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: {
    params: { id: string | undefined; farthestStep: number | undefined };
  }
) {
  // Extract ID from params and body from request
  const params = await context.params;
  const body = await req.json();
  console.log("Unparsed Body:", body);

  // Validate ID parameter
  if (!params.id || isNaN(Number(params.id))) {
    return NextResponse.json(
      { error: "Invalid or missing ID parameter" },
      { status: 400 }
    );
  }

  // Validate farthestStep parameter
  if (!params.farthestStep || isNaN(Number(params.farthestStep))) {
    return NextResponse.json(
      { error: "Invalid or missing farthestStep parameter" },
      { status: 400 }
    );
  }

  // Validate request body
  const { data, success, error } = onboardingStepOneSchema.safeParse(body);
  if (!success) {
    return NextResponse.json({ error: formatZodError(error) }, { status: 422 });
  }

  // Call the service to handle the business logic
  try {
    await OnboardingService.submitStepOne(
      Number(params.id),
      params.farthestStep,
      data
    );
    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error("Error submitting onboarding step one:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
