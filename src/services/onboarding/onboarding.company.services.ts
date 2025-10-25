import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import { EmployerOnboardingStepOneSchema } from "@/schema/onboarding";
import OnboardingSharedServices from "./onboarding.shared.services";

const CompanyOnboardingService = {
  async submitStepOne(
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
  },
};

export default CompanyOnboardingService;
export async function emptyForNow() {}
