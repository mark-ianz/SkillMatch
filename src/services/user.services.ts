import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface ApplicantProfileSidebar {
  user_id: number;
  name: string;
  student_number: string | null;
  course: string;
  location: string;
  applicant_image_path: string | null;
}

interface ApplicantProfileHeader {
  first_name: string;
  last_name: string;
  email: string;
  applicant_image_path: string | null;
}

export const UserService = {
  getApplicantProfileForSidebar: async (user_id: number): Promise<ApplicantProfileSidebar | null> => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          u.user_id,
          CONCAT(u.first_name, ' ', u.last_name) as name,
          op.student_number,
          op.course,
          CONCAT(u.barangay, ', ', u.city_municipality) as location,
          op.applicant_image_path
        FROM user u
        INNER JOIN applicant_profile op ON u.user_id = op.user_id
        WHERE u.user_id = ?`,
        [user_id]
      );

      if (rows.length === 0) return null;

      return rows[0] as ApplicantProfileSidebar;
    } catch (error) {
      console.error("Failed to fetch Applicant profile:", error);
      throw error;
    }
  },

  getApplicantProfileForHeader: async (user_id: number): Promise<ApplicantProfileHeader | null> => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          u.first_name,
          u.last_name,
          a.email,
          op.applicant_image_path
        FROM user u
        INNER JOIN applicant_profile op ON u.user_id = op.user_id
        INNER JOIN account a ON u.user_id = a.user_id
        WHERE u.user_id = ?`,
        [user_id]
      );

      if (rows.length === 0) return null;

      return rows[0] as ApplicantProfileHeader;
    } catch (error) {
      console.error("Failed to fetch Applicant profile for header:", error);
      throw error;
    }
  },
};
