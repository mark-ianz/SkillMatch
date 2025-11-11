import path from "path";
import fs from "fs";
import { ServiceError } from "@/lib/errors";

const ALLOWED = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

function sanitizeFileName(name?: string) {
  return name ? name.replace(/[^a-zA-Z0-9._-]/g, "_") : "image";
}

async function upload_local(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    throw new ServiceError("Invalid content-type", 400);
  }

  const formData = await request.formData();
  const entry = formData.get("file");
  if (!entry) throw new ServiceError("No file provided", 400);

  const fileObj = entry as unknown as {
    name?: string;
    type?: string;
    arrayBuffer?: () => Promise<ArrayBuffer>;
  };

  const fileType = fileObj.type || "";
  if (!ALLOWED.includes(fileType)) {
    throw new ServiceError("Invalid file type. Only images are allowed (JPEG, PNG, WebP)", 400);
  }

  const arrayBuffer = await fileObj.arrayBuffer!();
  const buffer = Buffer.from(arrayBuffer);
  if (buffer.length > MAX_BYTES) throw new ServiceError("File too large. Maximum size is 5MB", 413);

  const uploadsDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "company",
    "cover-image"
  );
  fs.mkdirSync(uploadsDir, { recursive: true });

  const safeName = sanitizeFileName(fileObj.name);
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = path.join(uploadsDir, fileName);
  fs.writeFileSync(filePath, buffer);
  
  // Always use forward slashes for web URLs, regardless of OS
  const public_path = `/uploads/company/cover-image/${fileName}`;

  return public_path;
}

const CompanyImageService = {
  upload_local,
};

export default CompanyImageService;
