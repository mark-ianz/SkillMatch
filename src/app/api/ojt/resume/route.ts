import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content-type" }, { status: 400 });
    }

    const formData = await request.formData();
    const entry = formData.get("resume");
    if (!entry) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // The entry should be a File-like object with 'name' and 'arrayBuffer' in the Next.js runtime
    const fileObj = entry as unknown as { name?: string; type?: string; arrayBuffer?: () => Promise<ArrayBuffer> };

    const fileType = fileObj.type || "";
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(fileType)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
    fs.mkdirSync(uploadsDir, { recursive: true });

    const arrayBuffer = await fileObj.arrayBuffer!();
    const buffer = Buffer.from(arrayBuffer);
    const MAX_BYTES = 5 * 1024 * 1024; // 5MB
    if (buffer.length > MAX_BYTES) {
      return NextResponse.json({ error: "File too large" }, { status: 413 });
    }
    const safeName = fileObj.name ? fileObj.name.replace(/[^a-zA-Z0-9._-]/g, "_") : "resume";
    const fileName = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const publicPath = `/uploads/resumes/${fileName}`;

    return NextResponse.json({ path: publicPath });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message || "Upload failed" }, { status: 500 });
  }
}
