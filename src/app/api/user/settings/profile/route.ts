import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { updatePersonalInfo, getUserSettings } from "@/services/user-settings.services";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { first_name, middle_name, last_name, phone_number, address } = body;

    await updatePersonalInfo(session.user.user_id, {
      first_name,
      middle_name,
      last_name,
      phone_number,
      address,
    });

    const updatedSettings = await getUserSettings(session.user.user_id);

    return NextResponse.json({
      message: "Personal information updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating personal info:", error);
    return NextResponse.json(
      { error: "Failed to update personal information" },
      { status: 500 }
    );
  }
}
