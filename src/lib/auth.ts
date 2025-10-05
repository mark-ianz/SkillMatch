import { NextAuthOptions, User } from "next-auth";
import { User as UserInfo } from "@/app/types/user.types";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { JWT } from "next-auth/jwt";
import { QCU_User } from "@/app/types/qcu_user.types";
import { MySQLError } from "@/app/types/mysql_error.types";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Itong user object sa taas ^^, laman niyan is yung info galing sa Google account

      const connection = await db.getConnection();

      try {
        await connection.connect();
        await connection.beginTransaction();

        // 1. Check if the user's email exists in the QCU database
        const [student] = await db.query<(QCU_User & RowDataPacket)[]>(
          "SELECT * FROM qcu_db WHERE email = ?",
          [user.email]
        );

        // 2. If may laman yung array, ibig sabihin may nag match na email sa database
        const isInDB = student.length > 0;

        // 3. If walang nag match, ibig sabihin yung email na ginamit is hindi associated sa QCU
        if (!isInDB) throw new Error("EmailNotAllowed"); // Throw Error

        // If the email exists in the QCU database, proceed with sign-in

        // 4. Check if user is onboarding (exists in onboarding table)
        const [isUserOnboarding] = await db.query<RowDataPacket[]>(
          "SELECT * FROM `onboarding` WHERE email = ?",
          [user.email]
        );

        // 5. If user is already onboarding, skip the inserting of data to user table and account table.
        // Else insert the data to user table, account table and onboarding table.
        if (!(isUserOnboarding.length > 0)) {
          // 5.1. Save user's data on the user table.
          const [newUser] = await db.query<ResultSetHeader>(
            "INSERT INTO `user` (`first_name`, `middle_name`, `last_name`, `gender`, `birthdate`, `street_address`, `phone_number`, `role_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              student[0].first_name,
              student[0].middle_name,
              student[0].last_name,
              student[0].gender,
              student[0].birthdate,
              student[0].address,
              student[0].phone_number,
              3, // Set role to 'OJT' (3)
              7, // Set status to 'Onboarding' (7)
            ]
          );

          // 5.2. Insert user data to account table
          await db.query<ResultSetHeader>(
            "INSERT INTO `account` (`user_id`, `email`, `profile_image`, `provider`, `provider_id`) VALUES (?, ?, ?, ?, ?)",
            [newUser.insertId, user.email, user.image, "google", user.id]
          );

          // 5.3. Insert user to onboarding table
          await db.query(
            "INSERT INTO `onboarding` (`user_id`,`email`, `step`) VALUES (?, ?, ?)",
            [newUser.insertId, user.email, 1]
          );
        }

        // 7. Commit the transaction if all queries are successful

        await connection.commit();
      } catch (error: Error | unknown) {
        // Catch the error, rollback the transaction, and return false to stop the sign-in process
        await connection.rollback();

        console.log(error);
        if ((error as MySQLError).code === "ER_DUP_ENTRY") {
          return "/gago"; // Continue the sign-in process if duplicate entry error occurs
        }

        if (error instanceof Error && error.message === "EmailNotAllowed") {
          return "/auth/signup?error=EmailNotAllowed"; // Redirect to sign-up page with error
        }

        await connection.rollback();
        return false; // Stop the sign-in process for other errors
      } finally {
        connection.release();
      }

      return true; // Continue the sign-up process
    },
  },
};
