import { db } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import { OnboardingPasswordSchema } from "@/schema/onboarding";
import bcrypt from "bcrypt";
import { ResultSetHeader } from "mysql2";
import { Pool, PoolConnection } from "mysql2/promise";

// helper: perform finalization using existing connection
async function _finalizeWithConnection(connection: unknown, user_id: number) {
  // set status to active and remove onboarding row
  // connection is expected to be a DB connection with a `query` method
  // We avoid generic type args here to keep signatures compatible.
  // connection is expected to be a DB connection with a `query` method
  await (
    connection as unknown as {
      query: (sql: string, params?: unknown[]) => Promise<unknown>;
    }
  ).query(`UPDATE account SET status_id = ? WHERE user_id = ?`, [1, user_id]);
  await (
    connection as unknown as {
      query: (sql: string, params?: unknown[]) => Promise<unknown>;
    }
  ).query(`DELETE FROM onboarding WHERE user_id = ?`, [user_id]);
}

async function submitPassword(user_id: number, data: OnboardingPasswordSchema) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Hash the password and update the account table
    const hashed = bcrypt.hashSync(data.password, 10);
    await connection.query<ResultSetHeader>(
      `UPDATE account SET password_hash = ? WHERE user_id = ?`,
      [hashed, user_id]
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

async function updateStep(
  connection: Pool | PoolConnection = db,
  update_to_step: number,
  farthestStep: number,
  user_id?: number,
  company_id?: number
) {
  // Since onboarding can be for both OJT and Company, we need to handle both cases

  // Check if both user_id and company_id are provided
  if (!user_id && !company_id) {
    throw new ServiceError(
      "Either user_id or company_id must be provided",
      400
    );
  }

  // Update the onboarding step based on whether it's for a user or a company
  if (company_id && !user_id) {
    await connection.query<ResultSetHeader>(
      `UPDATE onboarding SET step = ? WHERE onboarding.company_id = ?`,
      [
        // Compare it with the farthest step reached
        Math.max(update_to_step, farthestStep),
        company_id,
      ]
    );
  } else if (user_id && !company_id) {
    await connection.query<ResultSetHeader>(
      `UPDATE onboarding SET step = ? WHERE onboarding.user_id = ?`,
      [
        // Compare with the farthest step reached
        // Compare it with the farthest step reached
        // Because sometimes the user already reached step 5 and is just going back to step 3 to edit details
        Math.max(update_to_step, farthestStep),
        user_id,
      ]
    );
  }
}

const OnboardingSharedServices = {
  submitPassword,
  updateStep,
  _finalizeWithConnection,
};

export default OnboardingSharedServices;
