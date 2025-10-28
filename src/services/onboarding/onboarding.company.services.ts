import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import {
  EmployerOnboardingStepOneSchema,
  EmployerOnboardingStepTwoSchema,
} from "@/schema/onboarding";
import OnboardingSharedServices from "./onboarding.shared.services";

async function submitStepOne(
  company_id: number,
  _farthestStep: number,
  data: EmployerOnboardingStepOneSchema
) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query<ResultSetHeader>(
      `UPDATE company SET company_name = ?, company_email = ?, telephone_number = ?, phone_number = ? WHERE company_id = ?`,
      [
        data.company_name,
        data.company_email,
        data.telephone_number,
        data.phone_number,
        company_id,
      ]
    );

    OnboardingSharedServices.updateStep(
      connection,
      2,
      _farthestStep,
      company_id
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function submitStepTwo(
  company_id: number,
  _farthestStep: number,
  data: EmployerOnboardingStepTwoSchema
) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query<ResultSetHeader>(
      `UPDATE company SET mou_path = ?, loi_path = ?, cp_path = ? WHERE company_id = ?`,
      [
        data.mou_path,
        data.loi_path,
        data.cp_path,
        company_id,
      ]
    );

    OnboardingSharedServices.updateStep(
      connection,
      3,
      _farthestStep,
      company_id
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

const CompanyOnboardingService = {
  submitStepOne,
  submitStepTwo,
};

export default CompanyOnboardingService;
