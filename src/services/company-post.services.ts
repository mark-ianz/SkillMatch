import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { CompanyPostFormData } from "@/schema/company-post.schema";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ServiceError } from "@/lib/errors";
import { CompanyPost } from "@/types/company_post.types";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

function sanitizeFileName(name?: string) {
  return name ? name.replace(/[^a-zA-Z0-9._-]/g, "_") : "cover";
}

async function uploadCoverImage(file: File): Promise<string> {
  const fileType = file.type || "";
  if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
    throw new ServiceError(
      "Invalid image type. Only JPEG, PNG, WebP, and GIF are allowed.",
      400
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (buffer.length > MAX_IMAGE_SIZE) {
    throw new ServiceError("Image too large. Maximum size is 5MB.", 413);
  }

  const uploadsDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "company",
    "cover-image"
  );
  fs.mkdirSync(uploadsDir, { recursive: true });

  const safeName = sanitizeFileName(file.name);
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = path.join(uploadsDir, fileName);
  fs.writeFileSync(filePath, buffer);

  const publicPath = `/uploads/company/cover-image/${fileName}`;
  return publicPath;
}

export const CompanyPostServices = {
  createCompanyPost: async (
    data: CompanyPostFormData,
    company_id: string,
    coverImageFile?: File | null
  ) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const { title, content, cover_image } = data;

      // Handle file upload if file is provided
      let finalCoverImagePath = cover_image || null;
      if (coverImageFile) {
        finalCoverImagePath = await uploadCoverImage(coverImageFile);
      }

      // Generate nano ID for post_id
      const postId = nanoid();

      await connection.query<ResultSetHeader>(
        `INSERT INTO company_posts (post_id, company_id, title, content, cover_image, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [postId, company_id, title, content, finalCoverImagePath]
      );

      const [rows] = await connection.query<
        (RowDataPacket & CompanyPost)[]
      >(`SELECT * FROM company_posts WHERE post_id = ?`, [postId]);

      await connection.commit();

      if (!rows || rows.length === 0)
        throw new Error("Failed to retrieve created company post");

      const row = rows[0] as CompanyPost;
      return {
        ...row,
        post_id: row.post_id,
      };
    } catch (error) {
      console.log(error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  getCompanyPostsFeed: async (userCourse?: string, companyIndustries?: string[]) => {
    const connection = await db.getConnection();
    try {
      let query = `
        SELECT 
          cp.post_id,
          cp.company_id,
          cp.title,
          cp.content,
          cp.cover_image,
          cp.created_at,
          c.company_name,
          c.company_image
        FROM company_posts cp
        INNER JOIN company c ON cp.company_id = c.company_id
        ORDER BY cp.created_at DESC
      `;

      const params: string[] = [];

      // If user has a course (OJT), prioritize posts from companies with matching job posts
      if (userCourse) {
        query = `
          SELECT 
            cp.post_id,
            cp.company_id,
            cp.title,
            cp.content,
            cp.cover_image,
            cp.created_at,
            c.company_name,
            c.company_image,
            (
              SELECT COUNT(*) 
              FROM job_posts jp 
              WHERE jp.company_id = cp.company_id 
              AND FIND_IN_SET(?, jp.courses_required) > 0
            ) as course_match_count
          FROM company_posts cp
          INNER JOIN company c ON cp.company_id = c.company_id
          ORDER BY course_match_count DESC, cp.created_at DESC
        `;
        params.push(userCourse);
      }
      
      // If company user with industries, prioritize posts from companies with matching industries
      if (companyIndustries && companyIndustries.length > 0) {
        const industryConditions = companyIndustries.map(() => 
          `FIND_IN_SET(?, c.industry) > 0`
        ).join(' OR ');
        
        query = `
          SELECT 
            cp.post_id,
            cp.company_id,
            cp.title,
            cp.content,
            cp.cover_image,
            cp.created_at,
            c.company_name,
            c.company_image,
            CASE 
              WHEN ${industryConditions} THEN 1
              ELSE 0
            END as industry_match
          FROM company_posts cp
          INNER JOIN company c ON cp.company_id = c.company_id
          ORDER BY industry_match DESC, cp.created_at DESC
        `;
        params.push(...companyIndustries);
      }

      const [rows] = await connection.query<(RowDataPacket & CompanyPost)[]>(
        query,
        params
      );

      return rows as CompanyPost[];
    } catch (error) {
      console.error("Error fetching company posts feed:", error);
      throw error;
    } finally {
      connection.release();
    }
  },
};

export default CompanyPostServices;
