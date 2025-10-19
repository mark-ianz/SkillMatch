import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

/**
 * Safely delete a file inside the public/uploads/resumes folder.
 * Returns true if the file was deleted or didn't exist, false if refused or failed.
 */
export async function deleteFile(current_path: string): Promise<boolean> {
  // strip leading slashes
  const relativePath = current_path.replace(/^\/+/, "");

  // normalize the relative path to remove things like './' where possible
  const normalized = path.normalize(relativePath);

  const publicRoot = path.resolve(process.cwd(), "public");
  const uploadsRoot = path.resolve(publicRoot, "uploads", "resumes");
  const targetPath = path.resolve(publicRoot, normalized);

  // Ensure the target path is inside the uploads/resumes directory
  const uploadsRootWithSep = uploadsRoot.endsWith(path.sep)
    ? uploadsRoot
    : uploadsRoot + path.sep;
  if (targetPath !== uploadsRoot && !targetPath.startsWith(uploadsRootWithSep)) {
    console.warn("Refusing to delete file outside uploads/resumes:", targetPath);
    return false;
  }

  try {
    if (existsSync(targetPath)) {
      await fs.unlink(targetPath);
    }
    return true;
  } catch (err) {
    console.error("Failed to delete file:", err);
    return false;
  }
}
