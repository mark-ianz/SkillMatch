import { NextResponse } from "next/server";
import { CompanyPostServices } from "@/services/company-post.services";
import { companyPostSchema } from "@/schema/company-post.schema";
import { formatZodError } from "@/lib/utils";
import { ServiceError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    
    // Check if request contains FormData (with potential file upload)
    const isMultipart = contentType.includes("multipart/form-data");
    
    let body: {
      title?: unknown;
      content?: unknown;
      company_id?: number | null;
    };
    let coverImageFile: File | null = null;

    if (isMultipart) {
      const formData = await request.formData();
      
      // Extract text fields
      body = {
        title: formData.get("title"),
        content: formData.get("content"),
        company_id: formData.get("company_id") 
          ? Number(formData.get("company_id")) 
          : null,
      };
      
      // Extract file if present
      const file = formData.get("cover_image");
      if (file && file instanceof File) {
        coverImageFile = file;
      }
    } else {
      body = await request.json();
    }

    const { data, error, success } = companyPostSchema.safeParse(body);
    if (!success) {
      return NextResponse.json(
        { error: formatZodError(error) },
        { status: 422 }
      );
    }

    // TODO: determine company_id from auth/session
    // for now require in body
    const company_id =
      typeof body.company_id === "number" ? body.company_id : null;
    if (!company_id) {
      return NextResponse.json(
        { error: "Missing company_id" },
        { status: 401 }
      );
    }

    try {
      const created = await CompanyPostServices.createCompanyPost(
        data,
        company_id,
        coverImageFile
      );
      return NextResponse.json({ company_post: created }, { status: 201 });
    } catch (err) {
      if (err instanceof ServiceError) {
        return NextResponse.json(
          { error: err.message },
          { status: err.status }
        );
      }
      console.error("Failed to create company post", err);
      return NextResponse.json(
        { error: "Failed to create company post" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Invalid request to create company post", err);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
