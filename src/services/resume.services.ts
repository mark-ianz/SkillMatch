import path from "path";
import fs from "fs";
import { db } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import { OJTProfile } from "@/types/ojt_profile.types";
import { RowDataPacket } from "mysql2";
import { deleteFile } from "@/lib/file";

export const ResumeService = {
  upload_local: async (request: Request, user_id: number) => {
    // get the current resume_path from the database
    const [row] = await db.query<(OJTProfile & RowDataPacket)[]>(
      "SELECT resume_path FROM ojt_profile WHERE user_id = ?",
      [user_id]
    );

    const current_path = row[0]?.resume_path;

    if (current_path) {
      deleteFile(current_path);
    }

    // if there is a current_path, delete the file
    // DB stores paths like '/uploads/resumes/xxx' — strip leading slashes so path.join doesn't treat it as absolute
    

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      throw new ServiceError("Invalid content-type", 400);
    }

    const formData = await request.formData();
    const entry = formData.get("resume");
    if (!entry) {
      throw new ServiceError("No file provided", 400);
    }

    const fileObj = entry as unknown as {
      name?: string;
      type?: string;
      arrayBuffer?: () => Promise<ArrayBuffer>;
    };

    const fileType = fileObj.type || "";
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(fileType)) {
      throw new ServiceError("Invalid file type", 400);
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
    fs.mkdirSync(uploadsDir, { recursive: true });

    const arrayBuffer = await fileObj.arrayBuffer!();
    const buffer = Buffer.from(arrayBuffer);
    const MAX_BYTES = 5 * 1024 * 1024; // 5MB
    if (buffer.length > MAX_BYTES) {
      throw new ServiceError("File too large", 413);
    }

    const safeName = fileObj.name
      ? fileObj.name.replace(/[^a-zA-Z0-9._-]/g, "_")
      : "resume";
    const fileName = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    return fileName;
  },
  upload_path_to_db: async (user_id: number, path: string) => {
    try {
      await db.query(
        "UPDATE ojt_profile SET resume_path = ? WHERE user_id = ?",
        [path, user_id]
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  // this function uploads the file locally and to the database
  upload_both: async (request: Request, user_id: number) => {
    const fileName = await ResumeService.upload_local(request, user_id);
    const publicPath = `/uploads/resumes/${fileName}`;
    const uploadSuccess = await ResumeService.upload_path_to_db(
      user_id,
      publicPath
    );

    if (!uploadSuccess) {
      throw new ServiceError("Failed to update database", 500);
    }
    return publicPath;
  },
};

export default ResumeService;
