import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getUserSettings } from "@/services/user-settings.services";
import ResumeService from "@/services/resume.services";
import { ServiceError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use existing ResumeService which handles validation, file deletion, and DB update
    await ResumeService.upload_both(req, session.user.user_id);

    // Get updated settings to return
    const updatedSettings = await getUserSettings(session.user.user_id);

    return NextResponse.json({
      message: "Resume updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating resume:", error);

    if (error instanceof ServiceError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    );
  }
}
