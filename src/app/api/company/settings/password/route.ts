import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { CompanySettingsServices } from "@/services/company-settings.services";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.company_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!newPassword) {
      return NextResponse.json(
        { message: "New password is required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    await CompanySettingsServices.updatePassword(
      session.user.company_id,
      currentPassword,
      newPassword
    );

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update password" },
      { status: error.statusCode || 500 }
    );
  }
}
