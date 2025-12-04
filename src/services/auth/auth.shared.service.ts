import { db } from "@/lib/db";
import { MySQLError } from "@/types/mysql_error.types";
import { Account, ExtendedUser } from "@/types/user.types";
import { RowDataPacket } from "mysql2/promise";
import { insertApplicantData } from "./auth.applicant.service";
import { insertCompanyData } from "./auth.company.service";

export async function handleSignup(
  user: ExtendedUser,
  type: "applicant" | "company"
): Promise<true | false | string> {
  const connection = await db.getConnection();

  // Handle explicit signup intent for companies (separate provider id)
  try {
    await connection.connect();
    await connection.beginTransaction();

    // If account already exists, block signup as AlreadyExist
    const [existingAccount] = await connection.query<
      (Account & RowDataPacket)[]
    >("SELECT * FROM `account` WHERE email = ?", [user.email]);

    if (existingAccount.length > 0) {
      await connection.rollback();
      return `/signup?type=${type}&error=AlreadyExist`;
    }

    // Insert data based on type of signup
    if (type === "applicant") {
      const newApplicantId = await insertApplicantData(connection, user);

      (user as ExtendedUser).user_id = newApplicantId;
      (user as ExtendedUser).role_id = 3; // Applicant role
      (user as ExtendedUser).status_id = 7;
    } else if (type === "company") {
      const newCompanyId = await insertCompanyData(connection, user);

      (user as ExtendedUser).company_id = newCompanyId;
      (user as ExtendedUser).role_id = 4; // Company role
      (user as ExtendedUser).status_id = 7; // Onboarding status
    }

    await connection.commit();
    return true;
  } catch (error: Error | unknown) {
    console.log(error);
    await connection.rollback();
    if ((error as MySQLError).code === "ER_DUP_ENTRY") {
      return `/signup?type=${type}&error=DuplicateEntry`;
    }

    if (error instanceof Error && error.message === "EmailNotAllowed") {
      return `/signup?type=${type}&error=EmailNotAllowed`; // Redirect to sign-up page with error
    }

    return false;
  } finally {
    connection.release();
  }
}
