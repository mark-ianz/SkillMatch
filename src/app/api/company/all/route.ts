import { NextResponse } from "next/server";
import { CompanyServices } from "@/services/company.services";

export async function GET() {
  try {
    const companies = await CompanyServices.getAllCompanies();
    return NextResponse.json({ companies }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
