import { ServiceError } from "@/lib/errors";
import OnboardingSharedServices from "@/services/onboarding/onboarding.shared.services";
import ResumeService from "@/services/resume.services";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: {
    params: { id: string | undefined; farthestStep: number | undefined };
  }
) {
  // Extract user_id and farthestStep from params and body from request
  const params = await context.params;
  const farthestStep = Number(params.farthestStep);
  const user_id = Number(params.id);

  // Validate ID parameter
  if (!params.id || isNaN(Number(params.id))) {
    throw new ServiceError("Invalid or missing ID parameter", 400);
  }

  // Validate farthestStep parameter
  if (!params.farthestStep || isNaN(Number(params.farthestStep))) {
    throw new ServiceError("Invalid or missing farthestStep parameter", 400);
  }

  try {
    const path = await ResumeService.upload_both(request, user_id);

    await OnboardingSharedServices.updateStep({
      farthestStep,
      update_to_step: 6,
      user_id,
    });

    return NextResponse.json({ path });
  } catch (error) {
    if (error instanceof ServiceError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: message || "Upload failed" },
      { status: 500 }
    );
  }
}
