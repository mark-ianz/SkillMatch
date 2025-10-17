import path from "path";
import fs from "fs";

export function deleteFile(current_path: string) {
  const relativePath = current_path.replace(/^\/+/, "");
  const normalized = path.normalize(relativePath);

  const fullPath = path.join(process.cwd(), "public", normalized);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}
