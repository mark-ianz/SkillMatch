import { db } from "@/lib/db";
import { OnboardingPasswordSchema } from "@/schema/onboarding";
import bcrypt from "bcrypt";
import { ResultSetHeader } from "mysql2";

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
  ).query(`UPDATE user SET status_id = ? WHERE user_id = ?`, [1, user_id]);
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
  user_id: number,
  update_to_step: number,
  farthestStep: number
) {
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
}

const OnboardingSharedServices = {
  submitPassword,
  updateStep,
  _finalizeWithConnection,
};

export default OnboardingSharedServices;
