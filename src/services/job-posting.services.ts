import { db } from "@/lib/db";
import { JobPostingFormData } from "@/schema/job-posting.schema";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { nanoid } from "nanoid";

export const JobPostingServices = {
  getAllJobPosts: async () => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          jp.*,
          c.company_name,
          c.company_image,
          c.website,
          c.facebook_page,
          c.company_email
        FROM job_posts jp
        LEFT JOIN company c ON jp.company_id = c.company_id
        ORDER BY jp.created_at DESC`
      );

      // Normalize CSV fields to arrays
      return rows.map((row) => ({
        ...row,
        is_paid: Boolean(row.is_paid),
        job_responsibilities: row.job_responsibilities
          ? row.job_responsibilities.split(",")
          : [],
        courses_required: row.courses_required
          ? row.courses_required.split(",")
          : [],
        job_categories: row.job_categories ? row.job_categories.split(" / ") : [],
        soft_skills: row.soft_skills ? row.soft_skills.split(",") : [],
        technical_skills: row.technical_skills
          ? row.technical_skills.split(",")
          : [],
      }));
    } catch (error) {
      console.error("Failed to fetch job posts:", error);
      throw error;
    }
  },

  createJobPost: async (data: JobPostingFormData, company_id: string) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const {
        job_title,
        courses_required,
        job_categories,
        available_positions,
        job_overview,
        job_responsibilities,
        preferred_qualifications,
        work_arrangement,
        is_paid,
        allowance_description,
        soft_skills,
        technical_skills,
        street_name,
        barangay,
        city_municipality,
        postal_code,
      } = data;

      const job_post_id = nanoid();

      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO job_posts (job_post_id, company_id, job_title, courses_required, job_categories, available_positions, job_overview, job_responsibilities, preferred_qualifications, work_arrangement, is_paid, allowance_description, soft_skills, technical_skills, street_name, barangay, city_municipality, postal_code, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          job_post_id,
          company_id,
          job_title,
          (courses_required || []).join(","),
          (job_categories || []).join(","),
          available_positions,
          job_overview,
          (job_responsibilities || []).join(","),
          preferred_qualifications || null,
          work_arrangement,
          is_paid ? 1 : 0,
          allowance_description || null,
          (soft_skills || []).join(","),
          (technical_skills || []).join(","),
          street_name,
          barangay,
          city_municipality,
          postal_code,
        ]
      );

      const insertId = result.insertId;

      const [rows] = await connection.query<
        (RowDataPacket & { job_post_id: number })[]
      >(`SELECT * FROM job_posts WHERE job_post_id = ?`, [insertId]);
      console.log({ insertId, result, rows });

      await connection.commit();

      if (!rows || rows.length === 0)
        throw new Error("Failed to retrieve created job post");

      const row = rows[0] as RowDataPacket;
      // normalize arrays
      return {
        ...row,
        is_paid: Boolean(row.is_paid),
        job_responsibilities: row.job_responsibilities
          ? row.job_responsibilities.split(",")
          : [],
        courses_required: row.courses_required
          ? row.courses_required.split(",")
          : [],
        job_categories: row.job_categories ? row.job_categories.split(",") : [],
        soft_skills: row.soft_skills ? row.soft_skills.split(",") : [],
        technical_skills: row.technical_skills
          ? row.technical_skills.split(",")
          : [],
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};

export default JobPostingServices;
