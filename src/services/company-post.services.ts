import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { CompanyPostFormData } from "@/schema/company-post.schema";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ServiceError } from "@/lib/errors";
import { CompanyPost, ReactionType } from "@/types/company_post.types";

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

  // Add or update a reaction to a post
  addOrUpdateReaction: async (
    post_id: string,
    reaction_type: ReactionType,
    user_id?: string,
    company_id?: string
  ) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      if (!user_id && !company_id) {
        throw new ServiceError("Either user_id or company_id must be provided", 400);
      }

      const reaction_id = nanoid();

      // Check if reaction already exists
      const whereClause = user_id 
        ? "post_id = ? AND user_id = ?"
        : "post_id = ? AND company_id = ?";
      const whereParams = user_id 
        ? [post_id, user_id]
        : [post_id, company_id];

      const [existing] = await connection.query<RowDataPacket[]>(
        `SELECT reaction_id FROM company_post_reactions WHERE ${whereClause}`,
        whereParams
      );

      if (existing.length > 0) {
        // Update existing reaction
        await connection.query<ResultSetHeader>(
          `UPDATE company_post_reactions SET reaction_type = ? WHERE ${whereClause}`,
          [reaction_type, ...whereParams]
        );
      } else {
        // Insert new reaction
        await connection.query<ResultSetHeader>(
          `INSERT INTO company_post_reactions (reaction_id, post_id, user_id, company_id, reaction_type, created_at)
           VALUES (?, ?, ?, ?, ?, NOW())`,
          [reaction_id, post_id, user_id || null, company_id || null, reaction_type]
        );
      }

      await connection.commit();

      return { success: true };
    } catch (error) {
      await connection.rollback();
      console.error("Error adding/updating reaction:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Remove a reaction from a post
  removeReaction: async (
    post_id: string,
    user_id?: string,
    company_id?: string
  ) => {
    const connection = await db.getConnection();
    try {
      const whereClause = user_id 
        ? "post_id = ? AND user_id = ?"
        : "post_id = ? AND company_id = ?";
      const whereParams = user_id 
        ? [post_id, user_id]
        : [post_id, company_id];

      await connection.query<ResultSetHeader>(
        `DELETE FROM company_post_reactions WHERE ${whereClause}`,
        whereParams
      );

      return { success: true };
    } catch (error) {
      console.error("Error removing reaction:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get reaction counts for a post
  getReactionCounts: async (post_id: string) => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT reaction_type, COUNT(*) as count
         FROM company_post_reactions
         WHERE post_id = ?
         GROUP BY reaction_type`,
        [post_id]
      );

      const counts: Record<string, number> = {};
      rows.forEach((row) => {
        counts[row.reaction_type] = row.count;
      });

      return counts;
    } catch (error) {
      console.error("Error fetching reaction counts:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get user's reaction for a post
  getUserReaction: async (
    post_id: string,
    user_id?: string,
    company_id?: string
  ): Promise<ReactionType | null> => {
    const connection = await db.getConnection();
    try {
      const whereClause = user_id 
        ? "post_id = ? AND user_id = ?"
        : "post_id = ? AND company_id = ?";
      const whereParams = user_id 
        ? [post_id, user_id]
        : [post_id, company_id];

      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT reaction_type FROM company_post_reactions WHERE ${whereClause}`,
        whereParams
      );

      return rows.length > 0 ? rows[0].reaction_type : null;
    } catch (error) {
      console.error("Error fetching user reaction:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get all reactions with user details for a post
  getReactionsWithUsers: async (post_id: string) => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT 
          cpr.reaction_type,
          cpr.created_at,
          u.user_id,
          u.first_name,
          u.last_name,
          u.profile_picture,
          c.company_id,
          c.company_name,
          c.company_image
         FROM company_post_reactions cpr
         LEFT JOIN qcu_user u ON cpr.user_id = u.user_id
         LEFT JOIN company c ON cpr.company_id = c.company_id
         WHERE cpr.post_id = ?
         ORDER BY cpr.created_at DESC`,
        [post_id]
      );

      return rows;
    } catch (error) {
      console.error("Error fetching reactions with users:", error);
      throw error;
    } finally {
      connection.release();
    }
  },
};

export default CompanyPostServices;
