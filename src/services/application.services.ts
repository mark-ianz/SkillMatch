import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  Application,
  ApplicationWithJobDetails,
  ApplicationWithUserDetails,
  ApplicationStatusId,
  CompanyApplicationStatusId,
} from "@/types/application.types";

export const ApplicationServices = {
  // USER: Apply to a job
  applyToJob: async (
    user_id: number,
    job_post_id: string,
    resume_path?: string
  ): Promise<Application> => {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `INSERT INTO applications (user_id, job_post_id, resume_path, applied_date, created_at, updated_at)
         VALUES (?, ?, ?, NOW(), NOW(), NOW())`,
        [user_id, job_post_id, resume_path || null]
      );

      const [rows] = await db.query<(RowDataPacket & Application)[]>(
        `SELECT * FROM applications WHERE application_id = ?`,
        [result.insertId]
      );

      if (rows.length === 0) {
        throw new Error("Failed to retrieve created application");
      }

      return rows[0];
    } catch (error) {
      console.error("Error applying to job:", error);
      throw error;
    }
  },

  // USER: Get all applications for a user
  getUserApplications: async (
    user_id: number
  ): Promise<ApplicationWithJobDetails[]> => {
    try {
      const [rows] = await db.query<(RowDataPacket & ApplicationWithJobDetails)[]>(
        `SELECT 
          a.*,
          jp.job_title,
          jp.work_arrangement,
          jp.city_municipality,
          jp.barangay,
          c.company_name,
          c.company_image
        FROM applications a
        JOIN job_posts jp ON a.job_post_id = jp.job_post_id
        JOIN company c ON jp.company_id = c.company_id
        WHERE a.user_id = ?
        ORDER BY a.applied_date DESC`,
        [user_id]
      );

      return rows;
    } catch (error) {
      console.error("Error fetching user applications:", error);
      throw error;
    }
  },

  // USER: Get single application details
  getApplicationById: async (
    application_id: number,
    user_id?: number
  ): Promise<ApplicationWithJobDetails | null> => {
    try {
      const query = user_id
        ? `SELECT 
            a.*,
            jp.job_title,
            jp.work_arrangement,
            jp.city_municipality,
            jp.barangay,
            jp.job_overview,
            jp.available_positions,
            jp.is_paid,
            jp.allowance_description,
            c.company_name,
            c.company_image,
            c.company_email,
            c.website
          FROM applications a
          JOIN job_posts jp ON a.job_post_id = jp.job_post_id
          JOIN company c ON jp.company_id = c.company_id
          WHERE a.application_id = ? AND a.user_id = ?`
        : `SELECT 
            a.*,
            jp.job_title,
            jp.work_arrangement,
            jp.city_municipality,
            jp.barangay,
            jp.job_overview,
            jp.available_positions,
            jp.is_paid,
            jp.allowance_description,
            c.company_name,
            c.company_image,
            c.company_email,
            c.website
          FROM applications a
          JOIN job_posts jp ON a.job_post_id = jp.job_post_id
          JOIN company c ON jp.company_id = c.company_id
          WHERE a.application_id = ?`;

      const params = user_id ? [application_id, user_id] : [application_id];

      const [rows] = await db.query<(RowDataPacket & ApplicationWithJobDetails)[]>(
        query,
        params
      );

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching application:", error);
      throw error;
    }
  },

  // USER: Withdraw application
  withdrawApplication: async (
    application_id: number,
    user_id: number
  ): Promise<void> => {
    try {
      await db.query(
        `DELETE FROM applications WHERE application_id = ? AND user_id = ?`,
        [application_id, user_id]
      );
    } catch (error) {
      console.error("Error withdrawing application:", error);
      throw error;
    }
  },

  // USER: Respond to offer (accept/decline)
  respondToOffer: async (
    application_id: number,
    user_id: number,
    response: "accept" | "decline"
  ): Promise<void> => {
    try {
      const new_status = response === "accept" ? 11 : 12; // 11 = offer_accepted, 12 = offer_declined

      await db.query(
        `UPDATE applications 
         SET application_status_id = ?, 
             offer_response_date = NOW(),
             last_update = NOW()
         WHERE application_id = ? AND user_id = ? AND application_status_id = 10`,
        [new_status, application_id, user_id]
      );
    } catch (error) {
      console.error("Error responding to offer:", error);
      throw error;
    }
  },

  // COMPANY: Get all applications for a job post
  getJobPostApplications: async (
    job_post_id: string
  ): Promise<ApplicationWithUserDetails[]> => {
    try {
      const [rows] = await db.query<(RowDataPacket & ApplicationWithUserDetails)[]>(
        `SELECT 
          a.*,
          u.first_name,
          u.last_name,
          u.email as user_email,
          op.course,
          op.skills
        FROM applications a
        JOIN user u ON a.user_id = u.user_id
        LEFT JOIN ojt_profile op ON u.user_id = op.user_id
        WHERE a.job_post_id = ?
        ORDER BY a.applied_date DESC`,
        [job_post_id]
      );

      return rows.map((row) => ({
        ...row,
        user_name: `${row.first_name} ${row.last_name}`,
      }));
    } catch (error) {
      console.error("Error fetching job post applications:", error);
      throw error;
    }
  },

  // COMPANY: Update company status
  updateCompanyStatus: async (
    application_id: number,
    company_status_id: CompanyApplicationStatusId,
    company_notes?: string
  ): Promise<void> => {
    try {
      await db.query(
        `UPDATE applications 
         SET company_status_id = ?,
             company_notes = COALESCE(?, company_notes),
             last_update = NOW()
         WHERE application_id = ?`,
        [company_status_id, company_notes || null, application_id]
      );
    } catch (error) {
      console.error("Error updating company status:", error);
      throw error;
    }
  },

  // COMPANY: Schedule interview
  scheduleInterview: async (
    application_id: number,
    interview_date: string,
    interview_type: "virtual" | "in-person",
    interview_link?: string,
    interview_code?: string,
    interview_notes?: string
  ): Promise<void> => {
    try {
      await db.query(
        `UPDATE applications 
         SET application_status_id = 9,
             company_status_id = 9,
             interview_date = ?,
             interview_type = ?,
             interview_link = ?,
             interview_code = ?,
             interview_notes = ?,
             last_update = NOW()
         WHERE application_id = ?`,
        [
          interview_date,
          interview_type,
          interview_link || null,
          interview_code || null,
          interview_notes || null,
          application_id,
        ]
      );
    } catch (error) {
      console.error("Error scheduling interview:", error);
      throw error;
    }
  },

  // COMPANY: Send offer
  sendOffer: async (
    application_id: number,
    offer_deadline: string
  ): Promise<void> => {
    try {
      await db.query(
        `UPDATE applications 
         SET application_status_id = 10,
             company_status_id = 10,
             offer_sent_date = NOW(),
             offer_deadline = ?,
             last_update = NOW()
         WHERE application_id = ?`,
        [offer_deadline, application_id]
      );
    } catch (error) {
      console.error("Error sending offer:", error);
      throw error;
    }
  },

  // COMPANY: Reject application
  rejectApplication: async (
    application_id: number,
    rejection_reason?: string
  ): Promise<void> => {
    try {
      await db.query(
        `UPDATE applications 
         SET application_status_id = 3,
             company_status_id = 3,
             rejection_reason = ?,
             last_update = NOW()
         WHERE application_id = ?`,
        [rejection_reason || null, application_id]
      );
    } catch (error) {
      console.error("Error rejecting application:", error);
      throw error;
    }
  },

  // Check if user has already applied
  hasUserApplied: async (
    user_id: number,
    job_post_id: string
  ): Promise<boolean> => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT application_id FROM applications 
         WHERE user_id = ? AND job_post_id = ?`,
        [user_id, job_post_id]
      );

      return rows.length > 0;
    } catch (error) {
      console.error("Error checking application status:", error);
      throw error;
    }
  },
};
