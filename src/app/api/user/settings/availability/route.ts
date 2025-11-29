import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { updateAvailability, getUserSettings } from "@/services/user-settings.services";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user settings to find ojt_id
    const settings = await getUserSettings(session.user.user_id);
    if (!settings?.ojt_id) {
      return NextResponse.json({ error: "OJT profile not found" }, { status: 404 });
    }

    const body = await req.json();
    const { preferred_schedule, required_hours } = body;

    // Validate preferred_schedule format if provided
    if (preferred_schedule !== undefined && preferred_schedule !== null) {
      const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const days = preferred_schedule.split(",");
      
      for (const day of days) {
        if (!validDays.includes(day.trim())) {
          return NextResponse.json(
            { error: `Invalid day: ${day}. Valid days are: ${validDays.join(", ")}` },
            { status: 400 }
          );
        }
      }
    }

    // Validate required_hours if provided
    if (required_hours !== undefined && required_hours !== null) {
      if (typeof required_hours !== "number" || required_hours < 0) {
        return NextResponse.json(
          { error: "required_hours must be a positive number" },
          { status: 400 }
        );
      }
    }

    await updateAvailability(settings.ojt_id, {
      preferred_schedule,
      required_hours,
    });

    const updatedSettings = await getUserSettings(session.user.user_id);

    return NextResponse.json({
      message: "Availability updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json(
      { error: "Failed to update availability" },
      { status: 500 }
    );
  }
}
