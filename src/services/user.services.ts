import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface OJTProfileSidebar {
  user_id: number;
  name: string;
  student_id: string | null;
  course: string;
  location: string;
  ojt_image_path: string | null;
}

export const UserService = {
  getOJTProfileForSidebar: async (user_id: number): Promise<OJTProfileSidebar | null> => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          u.user_id,
          CONCAT(u.first_name, ' ', u.last_name) as name,
          op.student_id,
          op.course,
          CONCAT(u.barangay, ', ', u.city_municipality) as location,
          op.ojt_image_path
        FROM user u
        INNER JOIN ojt_profile op ON u.user_id = op.user_id
        WHERE u.user_id = ?`,
        [user_id]
      );

      if (rows.length === 0) return null;

      return rows[0] as OJTProfileSidebar;
    } catch (error) {
      console.error("Failed to fetch OJT profile:", error);
      throw error;
    }
  },
};
