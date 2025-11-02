import { db } from "@/lib/db";
import { MySQLError } from "@/types/mysql_error.types";
import { Account, ExtendedUser } from "@/types/user.types";
import { RowDataPacket } from "mysql2/promise";
import { insertOJTData } from "./auth.ojt.service";
import { insertCompanyData } from "./auth.company.service";

export async function handleSignup(
  user: ExtendedUser,
  type: "ojt" | "company"
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
      return "/signup?error=AlreadyExist";
    }

    // Insert data based on type of signup
    if (type === "ojt") {
      const newOJTId = await insertOJTData(connection, user);

      (user as ExtendedUser).user_id = newOJTId;
      (user as ExtendedUser).role_id = 3; // OJT role
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
    await connection.rollback();
    if ((error as MySQLError).code === "ER_DUP_ENTRY") {
      return "/signup?error=DuplicateEntry";
    }

    if (error instanceof Error && error.message === "EmailNotAllowed") {
      return "/signup?error=EmailNotAllowed"; // Redirect to sign-up page with error
    }

    return false;
  } finally {
    connection.release();
  }
}
