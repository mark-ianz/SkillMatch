import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  OnboardingPasswordSchema,
  OnboardingStepOneSchema,
  OnboardingStepThreeSchema,
  OnboardingStepTwoSchema,
} from "@/schema/onboarding";
import { OnboardingStudentFullInfo } from "@/types/onboarding.types";
import OnboardingSharedServices from "./onboarding.shared.services";

async function getOnboarding(user_id: number) {
  const [rows] = await db.query<(OnboardingStudentFullInfo & RowDataPacket)[]>(
    `SELECT o.*, u.*, op.*, a.email, a.role_id, a.status_id FROM 
        onboarding AS o
        JOIN user AS u
        ON o.user_id = u.user_id
        JOIN account AS a
        ON u.user_id = a.user_id
        JOIN applicant_profile AS op
        ON u.user_id = op.user_id
        WHERE o.user_id = ?`,
    [user_id]
  );
  return rows[0];
}

async function submitStepOne(
  user_id: number,
  _farthestStep: number,
  data: OnboardingStepOneSchema
) {
  const connection = await db.getConnection();

  try {
    // Update the user table with the provided data
    await connection.query<ResultSetHeader>(
      `UPDATE user SET middle_name = ?, gender = ?, phone_number = ? WHERE user.user_id = ?`,
      [data.middle_name, data.gender, data.phone_number, user_id]
    );

    // Update the step on the onboarding table
    OnboardingSharedServices.updateStep({
      connection,
      farthestStep: _farthestStep,
      update_to_step: 2,
      user_id,
    });

    // Commit the transaction
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  return;
}

async function submitStepTwo(
  user_id: number,
  _farthestStep: number,
  data: OnboardingStepTwoSchema
) {
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
    OnboardingSharedServices.updateStep({
      connection,
      farthestStep: _farthestStep,
      update_to_step: 3,
      user_id,
    });

    // Commit the transaction
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  return;
}

async function submitStepThree(
  user_id: number,
  _farthestStep: number,
  data: OnboardingStepThreeSchema
) {
  const connection = await db.getConnection();
  try {
    // Update the onboarding table with the provided data
    await connection.query<ResultSetHeader>(
      `UPDATE applicant_profile SET 
        student_number = ?,
        college = ?, 
        course = ?, 
        year_level = ?, 
        expected_graduation_year = ?,
        preferred_schedule = ?,
        required_hours = ?
      WHERE applicant_profile.user_id = ?`,
      [
        data.student_number,
        data.college,
        data.course,
        data.year_level,
        data.expected_graduation_year,
        data.preferred_schedule,
        data.required_hours,
        user_id,
      ]
    );

    // Update the step on the onboarding table
    OnboardingSharedServices.updateStep({
      connection,
      farthestStep: _farthestStep,
      update_to_step: 4,
      user_id,
    });

    // Commit the transaction
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  return;
}

async function submitStepSix(
  user_id: number,
  _farthestStep: number,
  data: OnboardingPasswordSchema
) {
  const connection = await db.getConnection();
  try {
    OnboardingSharedServices.submitPassword(user_id, data);

    // Finalize onboarding (same actions used by the skip flow)
    await OnboardingSharedServices._finalizeWithConnection(connection, user_id);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  return;
}

const OnboardingApplicantServices = {
  getOnboarding,
  submitStepOne,
  submitStepTwo,
  submitStepThree,
  submitStepSix,
}

export default OnboardingApplicantServices;