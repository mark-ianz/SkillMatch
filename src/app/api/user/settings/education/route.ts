import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { updateEducationDetails, getUserSettings } from "@/services/user-settings.services";

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
    const { student_number, college, course, year_level, expected_graduation_year } = body;

    await updateEducationDetails(settings.applicant_id, {
      student_number,
      college,
      course,
      year_level,
      expected_graduation_year,
    });

    const updatedSettings = await getUserSettings(session.user.user_id);

    return NextResponse.json({
      message: "Education details updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating education details:", error);
    return NextResponse.json(
      { error: "Failed to update education details" },
      { status: 500 }
    );
  }
}
