import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  OnboardingStepOneSchema,
  OnboardingStepThreeSchema,
  OnboardingStepTwoSchema,
} from "@/schema/onboarding";
import { OnboardingFullInfo } from "@/types/onboarding.types";

export const OnboardingService = {
  getOnboarding: async (user_id: number) => {
    const [rows] = await db.query<(OnboardingFullInfo & RowDataPacket)[]>(
      `SELECT o.*, u.*, op.*, a.email FROM 
        onboarding AS o
        JOIN user AS u
        ON o.user_id = u.user_id
        JOIN account AS a
        ON u.user_id = a.user_id
        JOIN ojt_profile AS op
        ON u.user_id = op.user_id
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

      // Update the step on the onboarding table
      OnboardingService.updateStep(user_id, 4, farthestStep);

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

  submitStepTwo: async (
    user_id: number,
    farthestStep: number,
    data: OnboardingStepTwoSchema
  ) => {
    const connection = await db.getConnection();
    try {
      // Update the onboarding table with the provided data
      await connection.query<ResultSetHeader>(
        `UPDATE user SET house_number = ?, street_name = ?, subdivision = ?, postal_code = ?, city_municipality = ?, barangay = ? WHERE user.user_id = ?`,
        [
          data.house_number,
          data.street_name,
          data.subdivision,
          data.postal_code,
          data.city_municipality,
          data.barangay,
          user_id,
        ]
      );

      // Update the step on the onboarding table
      OnboardingService.updateStep(user_id, 3, farthestStep);

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

  submitStepThree: async (
    user_id: number,
    farthestStep: number,
    data: OnboardingStepThreeSchema
  ) => {
    const connection = await db.getConnection();
    try {
      // Update the onboarding table with the provided data
      await connection.query<ResultSetHeader>(
        `UPDATE ojt_profile SET college = ?, course = ?, year_level = ?, expected_graduation_year = ? WHERE ojt_profile.user_id = ?`,
        [
          data.college,
          data.course,
          data.year_level,
          data.expected_graduation_year,
          user_id,
        ]
      );

      // Update the step on the onboarding table
      OnboardingService.updateStep(user_id, 4, farthestStep);

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

  updateStep: async (
    user_id: number,
    update_to_step: number,
    farthestStep: number
  ) => {
    await db.query<ResultSetHeader>(
      `UPDATE onboarding SET step = ? WHERE onboarding.user_id = ?`,
      [
        // Compare with the farthest step reached
        // Compare it with the farthest step reached
        // Because sometimes the user already reached step 5 and is just going back to step 3 to edit details
        Math.max(update_to_step, farthestStep),
        user_id,
      ]
    );
  },
};
