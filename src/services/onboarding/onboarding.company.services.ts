import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  EmployerOnboardingStepOneSchema,
  EmployerOnboardingStepTwoSchema,
  EmployerOnboardingStepThreeSchema,
} from "@/schema/onboarding";
import OnboardingSharedServices from "./onboarding.shared.services";
import { OnboardingPasswordSchema } from "@/schema/onboarding";
import bcrypt from "bcrypt";
import { OnboardingCompanyFullInfo } from "@/types/onboarding.types";

async function getOnboardingCompany(company_id: string) {
  const [rows] = await db.query<(OnboardingCompanyFullInfo & RowDataPacket)[]>(
    `SELECT o.*, c.*, a.email, a.role_id, a.status_id, a.profile_image FROM 
        onboarding AS o
        JOIN company AS c
        ON o.company_id = c.company_id
        JOIN account AS a
        ON o.company_id = a.company_id
        WHERE o.company_id = ?`,
    [company_id]
  );
  return rows[0];
}

async function submitStepOne(
  company_id: string,
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

    OnboardingSharedServices.updateStep({
      connection,
      farthestStep: _farthestStep,
      update_to_step: 2,
      company_id,
    });

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function submitStepTwo(
  company_id: string,
  _farthestStep: number,
  data: EmployerOnboardingStepTwoSchema
) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query<ResultSetHeader>(
      `UPDATE company SET mou_path = ?, loi_path = ?, cp_path = ? WHERE company_id = ?`,
      [data.mou_path, data.loi_path, data.cp_path, company_id]
    );

    OnboardingSharedServices.updateStep({
      connection,
      farthestStep: _farthestStep,
      update_to_step: 3,
      company_id,
    });

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function submitStepThree(
  company_id: string,
  _farthestStep: number,
  data: EmployerOnboardingStepThreeSchema
) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query<ResultSetHeader>(
      `UPDATE company SET business_permit_path = ?, mayor_permit_path = ?, dti_permit_path = ?, bir_cert_of_registration_path = ? WHERE company_id = ?`,
      [
        data.business_permit_path,
        data.mayor_permit_path,
        data.dti_permit_path,
        data.bir_cert_of_registration_path,
        company_id,
      ]
    );

    OnboardingSharedServices.updateStep({
      connection,
      farthestStep: _farthestStep,
      update_to_step: 4,
      company_id,
    });

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function submitStepFour(
  company_id: string,
  _farthestStep: number,
  data: OnboardingPasswordSchema
) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Hash and update company account password
    const hashed = bcrypt.hashSync(data.password, 10);
    await connection.query<ResultSetHeader>(
      `UPDATE account SET password_hash = ? WHERE company_id = ?`,
      [hashed, company_id]
    );

    // Finalize onboarding for company: mark account active and remove onboarding row
    await connection.query<ResultSetHeader>(
      `UPDATE account SET status_id = ? WHERE company_id = ?`,
      [1, company_id]
    );
    await connection.query<ResultSetHeader>(
      `DELETE FROM onboarding WHERE company_id = ?`,
      [company_id]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  return;
}

const CompanyOnboardingService = {
  getOnboardingCompany,
  submitStepOne,
  submitStepTwo,
  submitStepThree,
  submitStepFour,
};

export default CompanyOnboardingService;
