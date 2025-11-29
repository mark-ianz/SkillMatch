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
    const { city_municipality, barangay } = body;

    if (!city_municipality || !barangay) {
      return NextResponse.json(
        { message: "City/Municipality and Barangay are required" },
        { status: 400 }
      );
    }

    await CompanySettingsServices.updateLocation(session.user.company_id, {
      city_municipality,
      barangay,
    });

    return NextResponse.json(
      { message: "Location updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating location:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update location" },
      { status: error.statusCode || 500 }
    );
  }
}
