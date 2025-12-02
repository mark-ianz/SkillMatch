import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { nanoid } from "nanoid";

export const SavedItemsServices = {
  // Save a job post
  saveJob: async (user_id: string, job_post_id: string) => {
    const connection = await db.getConnection();
    try {
      const saved_id = nanoid();

      // Check if already saved
      const [existing] = await connection.query<RowDataPacket[]>(
        `SELECT saved_id FROM saved_jobs WHERE user_id = ? AND job_post_id = ?`,
        [user_id, job_post_id]
      );

      if (existing.length > 0) {
        return { success: true, alreadySaved: true };
      }

      await connection.query<ResultSetHeader>(
        `INSERT INTO saved_jobs (saved_id, user_id, job_post_id, saved_at) 
         VALUES (?, ?, ?, NOW())`,
        [saved_id, user_id, job_post_id]
      );

      return { success: true, alreadySaved: false };
    } catch (error) {
      console.error("Error saving job:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Unsave a job post
  unsaveJob: async (user_id: string, job_post_id: string) => {
    const connection = await db.getConnection();
    try {
      await connection.query<ResultSetHeader>(
        `DELETE FROM saved_jobs WHERE user_id = ? AND job_post_id = ?`,
        [user_id, job_post_id]
      );

      return { success: true };
    } catch (error) {
      console.error("Error unsaving job:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get all saved jobs for a user
  getSavedJobs: async (user_id: string) => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT 
          jp.*,
          c.company_name,
          c.company_image,
          c.industry,
          c.description as company_description,
          c.barangay,
          c.city_municipality,
          sj.saved_at
        FROM saved_jobs sj
        JOIN job_posts jp ON sj.job_post_id = jp.job_post_id
        JOIN company c ON jp.company_id = c.company_id
        WHERE sj.user_id = ?
        ORDER BY sj.saved_at DESC`,
        [user_id]
      );

      return rows.map((row) => ({
        ...row,
        courses_required: row.courses_required
          ? row.courses_required.split(",").map((c: string) => c.trim())
          : [],
        job_categories: row.job_categories
          ? row.job_categories.split(",").map((cat: string) => cat.trim())
          : [],
        job_responsibilities: row.job_responsibilities
          ? row.job_responsibilities.split(",").map((resp: string) => resp.trim())
          : [],
        soft_skills: row.soft_skills
          ? row.soft_skills.split(",").map((skill: string) => skill.trim())
          : [],
        technical_skills: row.technical_skills
          ? row.technical_skills.split(",").map((skill: string) => skill.trim())
          : [],
        industry: row.industry
          ? row.industry.split(",").map((ind: string) => ind.trim())
          : null,
      }));
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Check if a job is saved
  isJobSaved: async (user_id: string, job_post_id: string): Promise<boolean> => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT saved_id FROM saved_jobs WHERE user_id = ? AND job_post_id = ?`,
        [user_id, job_post_id]
      );

      return rows.length > 0;
    } catch (error) {
      console.error("Error checking if job is saved:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Save a company
  saveCompany: async (user_id: string, company_id: string) => {
    const connection = await db.getConnection();
    try {
      const saved_id = nanoid();

      // Check if already saved
      const [existing] = await connection.query<RowDataPacket[]>(
        `SELECT saved_id FROM saved_companies WHERE user_id = ? AND company_id = ?`,
        [user_id, company_id]
      );

      if (existing.length > 0) {
        return { success: true, alreadySaved: true };
      }

      await connection.query<ResultSetHeader>(
        `INSERT INTO saved_companies (saved_id, user_id, company_id, saved_at) 
         VALUES (?, ?, ?, NOW())`,
        [saved_id, user_id, company_id]
      );

      return { success: true, alreadySaved: false };
    } catch (error) {
      console.error("Error saving company:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Unsave a company
  unsaveCompany: async (user_id: string, company_id: string) => {
    const connection = await db.getConnection();
    try {
      await connection.query<ResultSetHeader>(
        `DELETE FROM saved_companies WHERE user_id = ? AND company_id = ?`,
        [user_id, company_id]
      );

      return { success: true };
    } catch (error) {
      console.error("Error unsaving company:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get all saved companies for a user
  getSavedCompanies: async (user_id: string) => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT 
          c.*,
          sc.saved_at,
          (SELECT COUNT(*) FROM job_posts WHERE company_id = c.company_id) as open_positions
        FROM saved_companies sc
        JOIN company c ON sc.company_id = c.company_id
        WHERE sc.user_id = ?
        ORDER BY sc.saved_at DESC`,
        [user_id]
      );

      return rows.map((row) => ({
        ...row,
        industry: row.industry
          ? row.industry.split(",").map((ind: string) => ind.trim())
          : [],
      }));
    } catch (error) {
      console.error("Error fetching saved companies:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Check if a company is saved
  isCompanySaved: async (user_id: string, company_id: string): Promise<boolean> => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT saved_id FROM saved_companies WHERE user_id = ? AND company_id = ?`,
        [user_id, company_id]
      );

      return rows.length > 0;
    } catch (error) {
      console.error("Error checking if company is saved:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Save a company post
  savePost: async (user_id: string, post_id: string) => {
    const connection = await db.getConnection();
    try {
      const saved_id = nanoid();

      // Check if already saved
      const [existing] = await connection.query<RowDataPacket[]>(
        `SELECT saved_id FROM saved_posts WHERE user_id = ? AND post_id = ?`,
        [user_id, post_id]
      );

      if (existing.length > 0) {
        return { success: true, alreadySaved: true };
      }

      await connection.query<ResultSetHeader>(
        `INSERT INTO saved_posts (saved_id, user_id, post_id, saved_at) 
         VALUES (?, ?, ?, NOW())`,
        [saved_id, user_id, post_id]
      );

      return { success: true, alreadySaved: false };
    } catch (error) {
      console.error("Error saving post:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Unsave a company post
  unsavePost: async (user_id: string, post_id: string) => {
    const connection = await db.getConnection();
    try {
      await connection.query<ResultSetHeader>(
        `DELETE FROM saved_posts WHERE user_id = ? AND post_id = ?`,
        [user_id, post_id]
      );

      return { success: true };
    } catch (error) {
      console.error("Error unsaving post:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get all saved posts for a user
  getSavedPosts: async (user_id: string) => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT 
          cp.*,
          c.company_name,
          c.company_image,
          sp.saved_at
        FROM saved_posts sp
        JOIN company_posts cp ON sp.post_id = cp.post_id
        JOIN company c ON cp.company_id = c.company_id
        WHERE sp.user_id = ?
        ORDER BY sp.saved_at DESC`,
        [user_id]
      );

      return rows;
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Check if a post is saved
  isPostSaved: async (user_id: string, post_id: string): Promise<boolean> => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT saved_id FROM saved_posts WHERE user_id = ? AND post_id = ?`,
        [user_id, post_id]
      );

      return rows.length > 0;
    } catch (error) {
      console.error("Error checking if post is saved:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get user profile for skill and course matching
  getUserProfile: async (user_id: string) => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT ap.skills, ap.course
         FROM applicant_profile ap
         JOIN user u ON ap.user_id = u.user_id
         WHERE u.user_id = ?`,
        [user_id]
      );

      return rows[0] || null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    } finally {
      connection.release();
    }
  },
};

export default SavedItemsServices;
