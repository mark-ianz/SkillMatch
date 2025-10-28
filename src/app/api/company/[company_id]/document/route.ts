import { NextResponse } from "next/server";
import CompanyDocumentsService from "@/services/company.documents.services";
import { ServiceError } from "@/lib/errors";

export async function POST(
  request: Request,
  context: { params: { company_id: string } }
) {
  const params = await context.params;
  const company_id = Number(params.company_id);

  if (!company_id || isNaN(company_id)) {
    return NextResponse.json(
      { error: "Invalid or missing company_id" },
      { status: 400 }
    );
  }

  try {
    const publicPath = await CompanyDocumentsService.upload_local(request);
    return NextResponse.json({ path: publicPath });
  } catch (err) {
    console.error("Company document upload failed:", err);
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
