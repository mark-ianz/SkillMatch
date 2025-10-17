import { NextResponse } from "next/server";
import ResumeService from "@/services/resume.services";
import { ServiceError } from "@/lib/errors";

export async function POST(
  request: Request,
  context: { params: { user_id: string } }
) {
  const params = await context.params;
  const user_id = Number(params.user_id);

  if (!user_id || isNaN(user_id)) {
    return NextResponse.json(
      { error: "Invalid or missing user_id parameter" },
      { status: 400 }
    );
  }

  try {
    const path = await ResumeService.upload_both(request, user_id);

    return NextResponse.json({ path });
  } catch (error) {
    console.log(error);

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
