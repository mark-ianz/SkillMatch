import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Account, ExtendedUser } from "@/types/user.types";
import { Onboarding } from "@/types/onboarding.types";
import { Pool, PoolConnection } from "mysql2/promise";
import { nanoid } from "nanoid";

/**
 * Company sign-in service: handles provider='google-company' sign-in cases.
 * Returns: true | false | redirect string
 */
export async function handleCompanySignIn(
  user: ExtendedUser
): Promise<true | false | string> {
  const connection = await db.getConnection();
  try {
    await connection.connect();
    await connection.beginTransaction();

    // Query Account Row
    const [accountRows] = await connection.query<(RowDataPacket & Account)[]>(
      "SELECT * FROM `account` WHERE email = ?",
      [user.email]
    );

    const acc = accountRows[0];
    const status_id = acc.status_id;

    // Check for onboarding row first
    const [onboardingRows] = await connection.query<
      (RowDataPacket & Onboarding)[]
    >("SELECT * FROM `onboarding` WHERE email = ?", [user.email]);

    if (onboardingRows.length > 0) {
      // Case A: onboarding exists -> redirect to onboarding page
      const company_id = onboardingRows[0].company_id;

      if (!company_id) {
        await connection.rollback();
        return "/signup?error=DataInconsistency";
      }

      (user as ExtendedUser).company_id = company_id;
      (user as ExtendedUser).role_id = 4;
      (user as ExtendedUser).status_id = status_id;

      await connection.commit();
      return true;
    }

    if (accountRows.length > 0) {
      if (!acc.company_id) {
        await connection.rollback();
        return "/signup?error=DataInconsistency";
      }

      const statusId: number = acc.status_id;
      // Active (1) -> allow and redirect to company-only area
      if (statusId === 1) {
        (user as ExtendedUser).company_id = acc.company_id;
        (user as ExtendedUser).role_id = acc.role_id ?? 4;
        (user as ExtendedUser).status_id = status_id;

        await connection.commit();
        return true;
      }

      // If status is onboarding (7) - should have been caught earlier, but treat as onboarding
      if (statusId === 7) {
        (user as ExtendedUser).company_id = acc.company_id;
        (user as ExtendedUser).role_id = acc.role_id ?? 4;
        (user as ExtendedUser).status_id = status_id;

        await connection.commit();
        return "/signup?error=AccountPending";
      }

      // Any other status treat as Pending (block sign-in)
      await connection.rollback();
      return "/signup?error=AccountInvalidStatus";
    }

    // No account and no onboarding -> DoesNotExist
    await connection.rollback();
    return "/signup?error=DoesNotExist";
  } catch (err) {
    await connection.rollback();
    console.error("company sign-in error:", err);
    return false;
  } finally {
    connection.release();
  }
}

/* 
  This function inserts company, account, and onboarding data into the database.
*/
export async function insertCompanyData(
  connection: PoolConnection | Pool = db,
  user: ExtendedUser
): Promise<string> {
  const company_id = nanoid()

  // Create company + account + onboarding for signup flow
  await connection.query<ResultSetHeader>(
    "INSERT INTO `company` (`company_id`,`company_name`, `company_email`, `company_image`) VALUES (?, ?, ?, ?)",
    [company_id, user.name, user.email, user.image]
  );

  await connection.query<ResultSetHeader>(
    "INSERT INTO `account` (`company_id`, `email`, `profile_image`, `provider`, `provider_id`, `role_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      company_id,
      user.email,
      user.image,
      "google-company",
      user.id,
      4,
      7,
    ]
  );

  await connection.query(
    "INSERT INTO `onboarding` (`company_id`,`email`, `step`) VALUES (?, ?, ?)",
    [company_id, user.email, 1]
  );

  return company_id;
}
