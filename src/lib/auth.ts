import { NextAuthOptions } from "next-auth";
import {
  ExtendedSession,
  ExtendedToken,
  ExtendedUser,
} from "@/types/user.types";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { QCU_User } from "@/types/qcu_user.types";
import { MySQLError } from "@/types/mysql_error.types";
import { Onboarding } from "@/types/onboarding.types";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      id: "google-ojt",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GoogleProvider({
      id: "google-company",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Itong user object sa taas ^^, laman niyan is yung info galing sa Google account
      const connection = await db.getConnection();

      if (account?.provider === "google-ojt") {
        try {
          await connection.connect();
          await connection.beginTransaction();

          // 1. Check if the user's email exists in the QCU database
          const [student] = await connection.query<
            (QCU_User & RowDataPacket)[]
          >("SELECT * FROM qcu_db WHERE email = ?", [user.email]);

          // 2. If may laman yung array, ibig sabihin may nag match na email sa database
          const isInDB = student.length > 0;

          // 3. If walang nag match, ibig sabihin yung email na ginamit is hindi associated sa QCU
          if (!isInDB) throw new Error("EmailNotAllowed"); // Throw Error

          // If the email exists in the QCU database, proceed with sign-in

          // 4. Check if user is onboarding (exists in onboarding table)
          const [onboarding] = await connection.query<
            (Onboarding & RowDataPacket)[]
          >("SELECT * FROM `onboarding` WHERE email = ?", [user.email]);

          // Initiate user_id variable for the user object
          let user_id: number | undefined | null;

          // 5. If user is not onboarding, insert the data to user table, account table and onboarding table.
          if (onboarding.length < 1) {
            // 5.1. Save user's data on the user table.
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

            // 5.2. Insert user data to account table
            await connection.query<ResultSetHeader>(
              "INSERT INTO `account` (`user_id`, `email`, `profile_image`, `provider`, `provider_id`, `role_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [
                newUser.insertId,
                user.email,
                user.image,
                "google-ojt",
                user.id,
                3, // Set role to 'OJT' (3)
                7, // Set status to 'Onboarding' (7)
              ]
            );

            // 5.3. Insert user to onboarding table
            await connection.query(
              "INSERT INTO `onboarding` (`user_id`,`email`, `step`) VALUES (?, ?, ?)",
              [newUser.insertId, user.email, 1]
            );

            // 5.4 Insert user to ojt_profile
            await connection.query(
              "INSERT INTO `ojt_profile` (`user_id`, `college`, `course`, `expected_graduation_year`) VALUES (?, ?, ?, ?)",
              [
                newUser.insertId,
                student[0].college,
                student[0].course,
                student[0].expected_graduation_year,
              ]
            );

            // 5.4 Define the user_id and role_id on the user object for session and jwt callbacks
            user_id = newUser.insertId;
          } else {
            // Else get their user id and define it on the user object for session and jwt callbacks.
            // Skip the inserting of data to user table and account table
            user_id = onboarding[0].user_id;
          }

          // 7. Define the user_id on the user object for session and jwt callbacks
          (user as ExtendedUser).user_id = user_id!;
          (user as ExtendedUser).role_id = 3; // Set role to 'OJT' (3)

          // 8. Commit the transaction if all queries are successful

          await connection.commit();
        } catch (error: Error | unknown) {
          // Catch the error, rollback the transaction, and return false to stop the sign-in process
          await connection.rollback();

          console.log(error);
          if ((error as MySQLError).code === "ER_DUP_ENTRY") {
            return "/signup?error=DuplicateEntry"; // Continue the sign-in process if duplicate entry error occurs
          }

          if (error instanceof Error && error.message === "EmailNotAllowed") {
            return "/signup?error=EmailNotAllowed"; // Redirect to sign-up page with error
          }

          await connection.rollback();
          return false; // Stop the sign-in process for other errors
        } finally {
          connection.release();
        }
      } else if (account?.provider === "google-company") {
        try {
          // 1. Check if user (company) is onboarding (exists in onboarding table)
          const [onboarding] = await connection.query<
            (Onboarding & RowDataPacket)[]
          >("SELECT * FROM `onboarding` WHERE email = ?", [user.email]);

          // Initiate company_id variable for the user object
          let company_id: number | undefined | null;

          // 2. If the user (company) is not onboarding, insert the data to onboarding table insert their data to company and account table.
          if (onboarding.length < 1) {
            // 2.1 Insert user to company table
            const [newCompany] = await connection.query<ResultSetHeader>(
              "INSERT INTO `company` (`company_name`, `company_email`, `company_image`, `status_id`) VALUES (?, ?, ?, ?)",
              [user.name, user.email, user.image, 7] // Set status to 'Onboarding' (7)
            );

            // 2.2 Insert user data to account table
            await connection.query<ResultSetHeader>(
              "INSERT INTO `account` (`company_id`, `email`, `profile_image`, `provider`, `provider_id`, `role_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [
                newCompany.insertId,
                user.email,
                user.image,
                "google-company",
                user.id,
                4, // Set role to 'Company' (4)
                7, // Set status to 'Onboarding' (7)
              ]
            );

            // 2.3. Insert company to onboarding table
            await connection.query(
              "INSERT INTO `onboarding` (`company_id`,`email`, `step`) VALUES (?, ?, ?)",
              [newCompany.insertId, user.email, 1]
            );

            // 2.4 Define the company_id and role_id on the user object for session and jwt callbacks
            company_id = newCompany.insertId;

          } else {
            // Else get their company id for the user object
            // Skip the inserting of data to user table and account table
            company_id = onboarding[0].company_id;
          }

          // 3. Define the user_id on the user object for session and jwt callbacks
          (user as ExtendedUser).company_id = company_id!;
          (user as ExtendedUser).role_id = 4; // Set role to 'Company' (4)

          // 4. Commit the transaction if all queries are successful
          await connection.commit();
        } catch (error) {
          if ((error as MySQLError).code === "ER_DUP_ENTRY") {
            return "/signup?error=DuplicateEntry"; // Continue the sign-in process if duplicate entry error occurs
          }

          await connection.rollback();
          return false; // Stop the sign-in process for other errors
        } finally {
          connection.release();
        }
      }

      return true; // Continue the sign-up process
    },
    async jwt({ token, user }) {
      // First time jwt callback is run, user object is available
      try {
        console.log("JWT Callback, token:", token);
        console.log("JWT Callback, user:", user);
        if (user) {
          token.email = user.email;
          token.name = user.name;
          token.picture = user.image;
          token.user_id = (user as ExtendedUser).user_id;
          token.company_id = (user as ExtendedUser).company_id;
          token.role_id = (user as ExtendedUser).role_id;
        }
        return token;
      } catch (error) {
        console.log("JWT CALLBACK ERROR:", error);
        return token;
      }
    },
    async session({ session, token }) {
      console.debug("Session Callback, session:", session);
      if (session.user) {
        session.user.email = (token as ExtendedToken).email;
        session.user.name = (token as ExtendedToken).name;
        session.user.image = (token as ExtendedToken).picture;
        (session as ExtendedSession).user.user_id = (
          token as ExtendedToken
        ).user_id;
        (session as ExtendedSession).user.role_id = (
          token as ExtendedToken
        ).role_id;
        (session as ExtendedSession).user.company_id = (
          token as ExtendedToken
        ).company_id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signup",
    signOut: "/signup",
    error: "/signup",
  },
};
