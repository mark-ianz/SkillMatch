import { NextResponse } from "next/server";
import { ServiceError } from "@/lib/errors";
import CompanyImageService from "@/services/company.image.services";

export async function POST(
  request: Request,
  context: { params: { company_id: string } }
) {
  const params = await context.params;
  const company_id = params.company_id;

  if (!company_id) {
    return NextResponse.json(
      { error: "Invalid or missing company_id" },
      { status: 400 }
    );
  }

  try {
    const publicPath = await CompanyImageService.upload_local(request);
    return NextResponse.json({ path: publicPath });
  } catch (err) {
    console.error("Company image upload failed:", err);
    if (err instanceof ServiceError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: message || "Upload failed" },
      { status: 500 }
    );
  }
}
