import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { OnboardingStepOneSchema } from "@/schema/onboarding";
import { OnboardingFullInfo } from "../types/user.types";

export const OnboardingService = {
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

  submitStepOne: async (
    user_id: number,
    farthestStep: number,
    data: OnboardingStepOneSchema
  ) => {
    const connection = await db.getConnection();

    try {
      // Update the user table with the provided data
      await connection.query<ResultSetHeader>(
        `UPDATE user SET middle_name = ?, gender = ?, phone_number = ? WHERE user.user_id = ?`,
        [data.middle_name, data.gender, data.phone_number, user_id]
      );

      // Get the

      // Update the step on the onboarding table
      await connection.query<ResultSetHeader>(
        `UPDATE onboarding SET step = ? WHERE onboarding.user_id = ?`,
        [
          // Compare with the farthest step reached
          // Since this HTTP handler handles submitting step one, the minimum step to set is 2
          // Compare it with the farthest step reached
          // Because sometimes the user already reached step 3 or 4 and is just going back to step 1 to edit details
          Math.max(2, farthestStep),
          user_id,
        ]
      );

      // Commit the transaction
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    return;
  },
};
