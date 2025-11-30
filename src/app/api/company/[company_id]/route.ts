import { NextRequest, NextResponse } from "next/server";
import CompanyServices from "@/services/company.services";

export async function GET(
  request: NextRequest,
  { params }: { params: { company_id: string } }
) {
  try {
    const { company_id } = params;

    if (!company_id) {
      return NextResponse.json(
        { success: false, message: "Company ID is required" },
        { status: 400 }
      );
    }

    const { company_profile, job_posted } = await CompanyServices.getCompanyWithJobs(company_id)

    return NextResponse.json(
      {
        company_profile,
        job_posted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching company profile with jobs:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
