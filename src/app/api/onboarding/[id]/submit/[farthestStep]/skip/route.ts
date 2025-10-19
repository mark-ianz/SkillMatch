import { OnboardingService } from "@/services/onboarding.services";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  context: { params: { id: string | undefined; farthestStep: number | undefined } }
) {
  const params = await context.params;

  if (!params.id || isNaN(Number(params.id))) {
    return NextResponse.json({ error: "Invalid or missing ID parameter" }, { status: 400 });
  }

  if (!params.farthestStep || isNaN(Number(params.farthestStep))) {
    return NextResponse.json({ error: "Invalid or missing farthestStep parameter" }, { status: 400 });
  }

  try {
    // update onboarding step +1 (use updateStep with new value)
    await OnboardingService.updateStep(Number(params.id), Number(params.farthestStep) + 1, Number(params.farthestStep));
    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error("Error skipping onboarding step:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
