import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { CompanySettingsServices } from "@/services/company-settings.services";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { ServiceError } from "@/lib/errors";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.company_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("logo") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No logo file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid file type. Only JPEG, PNG, and WebP are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: "File size too large. Maximum 5MB allowed" },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads", "company", "logos");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const uniqueFilename = `${session.user.company_id}-${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Save file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    // Generate public URL
    const publicUrl = `/uploads/company/logos/${uniqueFilename}`;

    // Update database
    const result = await CompanySettingsServices.updateCompanyLogo(
      session.user.company_id,
      publicUrl
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: ServiceError | unknown) {
    console.error("Error uploading company logo:", error);
    return NextResponse.json(
      { message: error instanceof ServiceError ? error.message : "Failed to upload company logo" },
      { status: error instanceof ServiceError ? error.status : 500 }
    );
  }
}
