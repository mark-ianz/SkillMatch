import { db } from "@/lib/db";
import {
  Pool,
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import { QCU_User } from "@/types/qcu_user.types";
import { MySQLError } from "@/types/mysql_error.types";
import { Onboarding } from "@/types/onboarding.types";
import { ExtendedUser, Account, User } from "@/types/user.types";
import { Account as NextAccount } from "next-auth";
import { Company } from "@/types/company.types";

/**
 * Handle OAuth sign-in logic for both Applicant and Company providers.
 * Returns true to continue sign-in, false to block, or a string redirect URL.
 */
export async function handleApplicantSignIn(
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
    const status_id = acc?.status_id;

    // Check for onboarding row first
    const [onboardingRows] = await connection.query<
      (RowDataPacket & Onboarding)[]
    >("SELECT * FROM `onboarding` WHERE email = ?", [user.email]);

    // If no records found on both account and onboarding, error
    if (!accountRows.length && !onboardingRows.length) {
      await connection.rollback();
      return "/signup?error=DoesNotExist";
    }

    if (onboardingRows.length > 0) {
      // Case A: onboarding exists -> redirect to onboarding page
      const user_id = onboardingRows[0].user_id;

      if (!user_id) {
        await connection.rollback();
        return "/signup?error=DataInconsistency";
      }
      (user as ExtendedUser).user_id = user_id;
      (user as ExtendedUser).role_id = acc.role_id;
      (user as ExtendedUser).status_id = status_id;
      await connection.commit();
      return true;
    }

    if (!acc.user_id) {
      await connection.rollback();
      return "/signup?error=DataInconsistency";
    }

    (user as ExtendedUser).user_id = acc.user_id;
    (user as ExtendedUser).role_id = acc.role_id;
    (user as ExtendedUser).status_id = status_id;

    if (accountRows.length > 0) {
      await connection.commit();
      return true;
    }

    return "/signup?error=DoesNotExist";
  } catch (error: Error | unknown) {
    console.log(error);
    await connection.rollback();

    if ((error as MySQLError).code === "ER_DUP_ENTRY") {
      return "/signup?error=DuplicateEntry";
    }

    if (error instanceof Error && error.message === "EmailNotAllowed") {
      return "/signup?error=EmailNotAllowed";
    }

    return false;
  } finally {
    connection.release();
  }

  return true;
}

/* 
  This function inserts user, account, and onboarding data into the database.
*/
export async function insertApplicantData(
  connection: PoolConnection | Pool = db,
  user: ExtendedUser
): Promise<number> {
  // 1. Check if the user's email exists in the QCU database
  const [student] = await connection.query<(QCU_User & RowDataPacket)[]>(
    "SELECT * FROM qcu_db WHERE email = ?",
    [user.email]
  );

  // 2. If may laman yung array, ibig sabihin may nag match na email sa database
  const isInDB = student.length > 0;

  // 3. If walang nag match, ibig sabihin yung email na ginamit is hindi associated sa QCU
  if (!isInDB) throw new Error("EmailNotAllowed"); // Throw Error

  // If the email exists in the QCU database, proceed with sign-in

  // 4.1. Save user's data on the user table.
  const [newUser] = await connection.query<ResultSetHeader>(
    "INSERT INTO `user` (`first_name`, `middle_name`, `last_name`, `gender`, `birthdate`, `street_name`, `phone_number`) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      student[0].first_name,
      student[0].middle_name,
      student[0].last_name,
      student[0].gender,
      student[0].birthdate,
      student[0].address,
      student[0].phone_number,
    ]
  );

  // 4.2. Insert user data to account table
  await connection.query<ResultSetHeader>(
    "INSERT INTO `account` (`user_id`, `email`, `provider`, `provider_id`, `role_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      newUser.insertId,
      user.email,
      "google-applicant",
      user.id,
      3, // Set role to 'Applicant' (3)
      7, // Set status to 'Onboarding' (7)
    ]
  );

  // 4.3. Insert user to onboarding table
  await connection.query(
    "INSERT INTO `onboarding` (`user_id`,`email`, `step`) VALUES (?, ?, ?)",
    [newUser.insertId, user.email, 1]
  );

  // 4.4 Insert user to applicant_profile
  await connection.query(
    "INSERT INTO `applicant_profile` (`user_id`, `college`, `course`, `expected_graduation_year`, `student_number`, `applicant_image_path`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      newUser.insertId,
      student[0].college,
      student[0].course,
      student[0].expected_graduation_year,
      student[0].student_number,
      user.image,
    ]
  );

  return newUser.insertId;
}
