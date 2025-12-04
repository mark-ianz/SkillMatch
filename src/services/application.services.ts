import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { nanoid } from "nanoid";
import {
  Application,
  ApplicationWithJobDetails,
  ApplicationWithUserDetails,
  CompanyApplicationStatusId,
  JobPostWithApplicationStatus,
} from "@/types/application.types";
import { NotificationServices } from "./notification.services";

export const ApplicationServices = {
  // USER: Apply to a job
  applyToJob: async (
    user_id: number,
    job_post_id: string,
    required_hours: number,
    preferred_schedule: string,
    resume_path?: string
  ): Promise<Application> => {
    try {
      const application_id = nanoid();
      
      await db.query<ResultSetHeader>(
        `INSERT INTO applications (
          application_id,
          user_id, 
          job_post_id, 
          required_hours, 
          preferred_schedule, 
          resume_path, 
          applied_date, 
          created_at, 
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
        [application_id, user_id, job_post_id, required_hours, preferred_schedule, resume_path || null]
      );

      const [rows] = await db.query<(RowDataPacket & Application)[]>(
        `SELECT * FROM applications WHERE application_id = ?`,
        [application_id]
      );

      if (rows.length === 0) {
        throw new Error("Failed to retrieve created application");
      }

      // Get job post details for notification
      const [jobRows] = await db.query<RowDataPacket[]>(
        `SELECT jp.job_title, jp.company_id, c.company_name 
         FROM job_posts jp 
         JOIN company c ON jp.company_id = c.company_id 
         WHERE jp.job_post_id = ?`,
        [job_post_id]
      );

      if (jobRows.length > 0) {
        const { job_title, company_id } = jobRows[0];
        
        // Create notification for company
        await NotificationServices.createCompanyNotification(
          company_id,
          "application_received",
          "New Application Received",
          `A student applied for ${job_title}`,
          application_id,
          job_post_id
        ).catch(err => console.error("Failed to create notification:", err));
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
    application_id: string,
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
    application_id: string,
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
    application_id: string,
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

      // Get application details for notification
      const [appRows] = await db.query<RowDataPacket[]>(
        `SELECT jp.job_title, jp.job_post_id, jp.company_id, c.company_name, u.first_name, u.last_name 
         FROM applications a 
         JOIN job_posts jp ON a.job_post_id = jp.job_post_id 
         JOIN company c ON jp.company_id = c.company_id 
         JOIN user u ON a.user_id = u.user_id 
         WHERE a.application_id = ?`,
        [application_id]
      );

      if (appRows.length > 0) {
        const { job_title, job_post_id, company_id, first_name, last_name } = appRows[0];
        const studentName = `${first_name} ${last_name}`;
        const accepted = new_status === 11;
        
        await NotificationServices.createCompanyNotification(
          company_id,
          "offer_response",
          accepted ? "Offer Accepted!" : "Offer Declined",
          accepted 
            ? `${studentName} has accepted your offer for ${job_title}` 
            : `${studentName} has declined your offer for ${job_title}`,
          application_id,
          job_post_id
        ).catch(err => console.error("Failed to create notification:", err));
      }
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
          u.phone_number,
          u.street_name,
          u.house_number,
          u.subdivision,
          u.postal_code,
          u.barangay,
          u.city_municipality,
          u.region,
          acc.email as user_email,
          op.course,
          op.skills
        FROM applications a
        JOIN user u ON a.user_id = u.user_id
        JOIN account acc ON u.user_id = acc.user_id
        LEFT JOIN applicant_profile op ON u.user_id = op.user_id
        WHERE a.job_post_id = ?
        ORDER BY a.applied_date DESC`,
        [job_post_id]
      );

      return rows.map((row) => {
        // Construct full address from components
        const addressParts = [
          row.house_number,
          row.street_name,
          row.subdivision,
          row.barangay,
          row.city_municipality,
          row.region,
          row.postal_code,
        ].filter(Boolean);
        
        return {
          ...row,
          user_name: `${row.first_name} ${row.last_name}`,
          address: addressParts.length > 0 ? addressParts.join(', ') : null,
        };
      });
    } catch (error) {
      console.error("Error fetching job post applications:", error);
      throw error;
    }
  },

  // COMPANY: Get all job posts for a company with application statistics
  getCompanyJobPostsWithStats: async (
    company_id: string
  ): Promise<JobPostWithApplicationStatus[]> => {
    try {
      const [rows] = await db.query<(RowDataPacket & JobPostWithApplicationStatus)[]>(
        `SELECT 
          jp.job_post_id,
          jp.job_title,
          jp.work_arrangement,
          jp.available_positions,
          jp.job_post_status_id,
          jp.rejected_reason,
          jp.created_at,
          jp.updated_at,
          COUNT(a.application_id) as total_applications,
          SUM(CASE WHEN a.company_status_id = 8 THEN 1 ELSE 0 END) as new_applications,
          SUM(CASE WHEN a.company_status_id = 13 THEN 1 ELSE 0 END) as shortlisted,
          SUM(CASE WHEN a.company_status_id = 14 THEN 1 ELSE 0 END) as on_hold,
          SUM(CASE WHEN a.company_status_id = 9 THEN 1 ELSE 0 END) as interview_scheduled,
          SUM(CASE WHEN a.company_status_id = 10 THEN 1 ELSE 0 END) as selected,
          SUM(CASE WHEN a.company_status_id = 11 THEN 1 ELSE 0 END) as offer_accepted,
          SUM(CASE WHEN a.application_status_id = 12 THEN 1 ELSE 0 END) as offer_declined,
          SUM(CASE WHEN a.company_status_id = 3 THEN 1 ELSE 0 END) as rejected
        FROM job_posts jp
        LEFT JOIN applications a ON jp.job_post_id = a.job_post_id
        WHERE jp.company_id = ?
        GROUP BY jp.job_post_id
        ORDER BY jp.updated_at DESC`,
        [company_id]
      );

      return rows;
    } catch (error) {
      console.error("Error fetching company job posts with stats:", error);
      throw error;
    }
  },

  // COMPANY: Update company status
  updateCompanyStatus: async (
    application_id: string,
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

      // Get application details for notification
      const [appRows] = await db.query<RowDataPacket[]>(
        `SELECT a.user_id, jp.job_title, jp.job_post_id 
         FROM applications a 
         JOIN job_posts jp ON a.job_post_id = jp.job_post_id 
         WHERE a.application_id = ?`,
        [application_id]
      );

      if (appRows.length > 0) {
        const { user_id, job_title, job_post_id } = appRows[0];
        
        // Create notification for user based on status change
        let title = "Application Status Updated";
        let message = `Your application for ${job_title} has been updated`;
        
        if (company_status_id === 13) {
          title = "You've Been Shortlisted!";
          message = `Great news! You've been shortlisted for ${job_title}`;
        } else if (company_status_id === 14) {
          title = "Application On Hold";
          message = `Your application for ${job_title} is currently on hold`;
        }
        
        await NotificationServices.createUserNotification(
          user_id,
          "application_status_update",
          title,
          message,
          application_id,
          job_post_id
        ).catch(err => console.error("Failed to create notification:", err));
      }
    } catch (error) {
      console.error("Error updating company status:", error);
      throw error;
    }
  },

  // COMPANY: Schedule interview
  scheduleInterview: async (
    application_id: string,
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

      // Get application details for notification
      const [appRows] = await db.query<RowDataPacket[]>(
        `SELECT a.user_id, jp.job_title, jp.job_post_id, c.company_name 
         FROM applications a 
         JOIN job_posts jp ON a.job_post_id = jp.job_post_id 
         JOIN company c ON jp.company_id = c.company_id 
         WHERE a.application_id = ?`,
        [application_id]
      );

      if (appRows.length > 0) {
        const { user_id, job_title, job_post_id, company_name } = appRows[0];
        const interviewDateFormatted = new Date(interview_date).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        
        await NotificationServices.createUserNotification(
          user_id,
          "interview_scheduled",
          "Interview Scheduled",
          `Your interview for ${job_title} at ${company_name} is scheduled for ${interviewDateFormatted}`,
          application_id,
          job_post_id
        ).catch(err => console.error("Failed to create notification:", err));
      }
    } catch (error) {
      console.error("Error scheduling interview:", error);
      throw error;
    }
  },

  // COMPANY: Select applicant
  selectApplicant: async (
    application_id: string,
    offer_deadline: string
  ): Promise<void> => {
    try {
      await db.query(
        `UPDATE applications 
         SET application_status_id = 10,
             company_status_id = 10,
             selected_date = NOW(),
             offer_deadline = ?,
             last_update = NOW()
         WHERE application_id = ?`,
        [offer_deadline, application_id]
      );

      // Get application details for notification
      const [appRows] = await db.query<RowDataPacket[]>(
        `SELECT a.user_id, jp.job_title, jp.job_post_id, c.company_name 
         FROM applications a 
         JOIN job_posts jp ON a.job_post_id = jp.job_post_id 
         JOIN company c ON jp.company_id = c.company_id 
         WHERE a.application_id = ?`,
        [application_id]
      );

      if (appRows.length > 0) {
        const { user_id, job_title, job_post_id, company_name } = appRows[0];
        const deadlineFormatted = new Date(offer_deadline).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        
        await NotificationServices.createUserNotification(
          user_id,
          "offer_sent",
          "Congratulations! You've Been Selected",
          `${company_name} has selected you for ${job_title}. Please respond by ${deadlineFormatted}`,
          application_id,
          job_post_id
        ).catch(err => console.error("Failed to create notification:", err));
      }
    } catch (error) {
      console.error("Error sending offer:", error);
      throw error;
    }
  },

  // COMPANY: Reject application
  rejectApplication: async (
    application_id: string,
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
