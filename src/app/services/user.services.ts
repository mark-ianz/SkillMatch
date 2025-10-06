import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { OnboardingFullInfo } from "../types/user.types";

export const UserService = {
  getOnboarding: async (user_id: number) => {
    const [rows] = await db.query<(OnboardingFullInfo & RowDataPacket)[]>(
      `SELECT o.*, u.*, a.email FROM 
        onboarding AS o
        JOIN user AS u
        ON o.user_id = u.user_id
        JOIN account AS a
        ON u.user_id = a.user_id
        WHERE o.user_id = ?`,
      [user_id]
    );
    return rows[0];
  },
};
