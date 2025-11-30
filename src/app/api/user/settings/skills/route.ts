import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { updateSkills, getUserSettings } from "@/services/user-settings.services";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user settings to find applicant_id
    const settings = await getUserSettings(session.user.user_id);
    if (!settings?.applicant_id) {
      return NextResponse.json({ error: "Applicant profile not found" }, { status: 404 });
    }

    const body = await req.json();
    const { skills } = body;

    if (!Array.isArray(skills)) {
      return NextResponse.json(
        { error: "Skills must be an array" },
        { status: 400 }
      );
    }

    await updateSkills(settings.applicant_id, skills);

    const updatedSettings = await getUserSettings(session.user.user_id);

    return NextResponse.json({
      message: "Skills updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 }
    );
  }
}
