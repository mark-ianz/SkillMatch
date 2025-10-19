import { NextResponse } from "next/server";
import { OnboardingService } from "@/services/onboarding.services";

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
  await OnboardingService.finalizeOnboardingNoPassword(Number(params.id));
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
