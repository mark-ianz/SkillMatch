import { NextResponse } from "next/server";
import { CompanyPostServices } from "@/services/company-post.services";
import { companyPostSchema } from "@/schema/company-post.schema";
import { formatZodError } from "@/lib/utils";
import { ServiceError } from "@/lib/errors";
import { moderateImage, validateImageFile } from "@/services/image-moderation.service";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    
    // Check if request contains FormData (with potential file upload)
    const isMultipart = contentType.includes("multipart/form-data");
    
    let body: {
      title?: unknown;
      content?: unknown;
      company_id?: string | null;
    };
    let coverImageFile: File | null = null;

    if (isMultipart) {
      const formData = await request.formData();
      
      // Extract text fields
      body = {
        title: formData.get("title"),
        content: formData.get("content"),
        company_id: formData.get("company_id") as string | null,
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
      typeof body.company_id === "string" ? body.company_id : null;
    if (!company_id) {
      return NextResponse.json(
        { error: "Missing company_id" },
        { status: 401 }
      );
    }

    // If there's a cover image file, validate and moderate it
    if (coverImageFile) {
      // Validate file type and size
      try {
        validateImageFile(coverImageFile);
      } catch (err) {
        if (err instanceof ServiceError) {
          return NextResponse.json(
            { error: err.message },
            { status: err.status }
          );
        }
        return NextResponse.json(
          { error: "Invalid image file" },
          { status: 400 }
        );
      }

      // Moderate image for inappropriate content
      try {
        const moderationResult = await moderateImage(coverImageFile);
        
        if (!moderationResult.safe) {
          return NextResponse.json(
            { 
              error: moderationResult.reason || "Image contains inappropriate content",
            },
            { status: 400 }
          );
        }
      } catch (err) {
        if (err instanceof ServiceError) {
          return NextResponse.json(
            { error: err.message },
            { status: err.status }
          );
        }
        // Don't block the upload if moderation service fails
        console.error("Image moderation service error:", err);
      }
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
