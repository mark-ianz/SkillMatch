import path from "path";
import fs from "fs";
import { ServiceError } from "@/lib/errors";

const ALLOWED = ["application/pdf", "image/jpeg", "image/png"];
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

function sanitizeFileName(name?: string) {
  return name ? name.replace(/[^a-zA-Z0-9._-]/g, "_") : "file";
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
    throw new ServiceError("Invalid file type", 400);
  }

  const arrayBuffer = await fileObj.arrayBuffer!();
  const buffer = Buffer.from(arrayBuffer);
  if (buffer.length > MAX_BYTES) throw new ServiceError("File too large", 413);

  const uploadsDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "company",
    "documents"
  );
  fs.mkdirSync(uploadsDir, { recursive: true });

  const safeName = sanitizeFileName(fileObj.name);
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = path.join(uploadsDir, fileName);
  fs.writeFileSync(filePath, buffer);
  const public_path = path.join("/uploads/company/documents/", fileName);

  return public_path;
}

/* async function upload_path_to_db(
  company_id: string,
  field: string,
  publicPath: string
) {
  // only allow specific fields
  const allowedFields = ["mou_path", "loi_path", "cp_path"];
  if (!allowedFields.includes(field)) {
    throw new ServiceError("Invalid field", 400);
  }

  try {
    await db.query(`UPDATE company SET ${field} = ? WHERE company_id = ?`, [
      publicPath,
      company_id,
    ]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
} */

/* async function upload_both(request: Request) {
  // upload_local only saves the file and returns the filename; do NOT update DB here.
  const fileName = await upload_local(request);
  const publicPath = `/uploads/company/documents/${fileName}`;
  return publicPath;
} */

const CompanyDocumentsService = {
  upload_local,
  /* upload_path_to_db,
  upload_both, */
};

export default CompanyDocumentsService;
