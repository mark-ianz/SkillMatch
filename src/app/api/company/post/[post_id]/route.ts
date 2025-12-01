import { NextResponse } from "next/server";
import { CompanyPostServices } from "@/services/company-post.services";
import { companyPostSchema } from "@/schema/company-post.schema";
import { formatZodError } from "@/lib/utils";
import { ServiceError } from "@/lib/errors";

export async function PUT(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  try {
    const { post_id } = params;
    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");

    let body: {
      title?: unknown;
      content?: unknown;
      company_id?: string | null;
    };
    let coverImageFile: File | null = null;

    if (isMultipart) {
      const formData = await request.formData();

      body = {
        title: formData.get("title"),
        content: formData.get("content"),
        company_id: formData.get("company_id") as string | null,
      };

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

    const company_id =
      typeof body.company_id === "string" ? body.company_id : null;
    if (!company_id) {
      return NextResponse.json(
        { error: "Missing company_id" },
        { status: 401 }
      );
    }

    try {
      const updated = await CompanyPostServices.updateCompanyPost(
        post_id,
        company_id,
        data,
        coverImageFile
      );
      return NextResponse.json({ company_post: updated }, { status: 200 });
    } catch (err) {
      if (err instanceof ServiceError) {
        return NextResponse.json(
          { error: err.message },
          { status: err.status }
        );
      }
      console.error("Failed to update company post", err);
      return NextResponse.json(
        { error: "Failed to update company post" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Invalid request to update company post", err);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  try {
    const { post_id } = params;
    const { searchParams } = new URL(request.url);
    const company_id = searchParams.get("company_id");

    if (!company_id) {
      return NextResponse.json(
        { error: "Missing company_id" },
        { status: 401 }
      );
    }

    try {
      await CompanyPostServices.deleteCompanyPost(post_id, company_id);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
      if (err instanceof ServiceError) {
        return NextResponse.json(
          { error: err.message },
          { status: err.status }
        );
      }
      console.error("Failed to delete company post", err);
      return NextResponse.json(
        { error: "Failed to delete company post" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Invalid request to delete company post", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
