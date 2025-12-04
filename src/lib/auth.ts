import { NextAuthOptions } from "next-auth";
import {
  ExtendedSession,
  ExtendedToken,
  ExtendedUser,
} from "@/types/user.types";
import { handleCompanySignIn } from "@/services/auth/auth.company.service";
import { handleApplicantSignIn } from "@/services/auth/auth.applicant.service";
import { handleSignup } from "@/services/auth/auth.shared.service";
import { adminCredentialsProvider } from "@/services/auth/auth.admin.service";
import {
  applicantCredentialsProvider,
  companyCredentialsProvider,
  googleApplicantSignInProvider,
  googleApplicantSignUpProvider,
  googleCompanySignInProvider,
  googleCompanySignUpProvider,
} from "./auth.providers";
import { RowDataPacket } from "mysql2";

export const authConfig: NextAuthOptions = {
  providers: [
    adminCredentialsProvider,
    applicantCredentialsProvider,
    companyCredentialsProvider,
    googleApplicantSignInProvider,
    googleApplicantSignUpProvider,
    googleCompanySignInProvider,
    googleCompanySignUpProvider,

  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        /* Admin Credentials Authentication */
        if (account?.provider === "admin-credentials") {
          // Admin login via credentials - already validated in authorize
          return true;
        }

        /* Applicant/Company Credentials Authentication */
        if (account?.provider === "applicant-credentials" || account?.provider === "company-credentials") {
          // Password-based authentication - already validated in authorize
          return true;
        }

        /* Company Authentication Flows */
        if (account?.provider === "google-company-signup") {
          // Explicit signup provider — handle as signup
          const res = await handleSignup(user as ExtendedUser, "company");
          return res;
        }

        if (account?.provider === "google-company-signin") {
          // Company sign-in flow
          const res = await handleCompanySignIn(user as ExtendedUser);
          return res;
        }

        /* Applicant Authentication Flows */
        if (account?.provider === "google-applicant-signup") {
          // Applicant sign-up flow
          const res = await handleSignup(user as ExtendedUser, "applicant");
          return res;
        }

        if (account?.provider === "google-applicant-signin") {
          // Applicant sign-in flow
          const res = await handleApplicantSignIn(user as ExtendedUser);
          console.log("res", res);
          return res;
        }

        console.log("ME??");
        return false;

        /* // Fallback / Applicant provider
        const result = await handleOAuthSignIn(user as ExtendedUser, account); */
        /* return result; */
      } catch (err) {
        console.error("Sign-in service failed:", err);
        return false;
      }
    },
    async jwt({ token, user, trigger }) {
      // First time jwt callback is run, user object is available
      try {
        if (user) {
          token.email = user.email;
          token.name = user.name;
          token.picture = user.image;
          token.user_id = (user as ExtendedUser).user_id;
          token.company_id = (user as ExtendedUser).company_id;
          token.role_id = (user as ExtendedUser).role_id;
          token.status_id = (user as ExtendedUser).status_id;
          token.isAdmin = (user as ExtendedUser).isAdmin || false;
          token.username = (user as ExtendedUser).username;
        }

        // Handle session update trigger - refetch status_id from database
        if (trigger === "update") {
          const { db } = await import("@/lib/db");
          
          // Fetch latest account data based on user_id or company_id
          if (token.user_id) {
            const [rows] = await db.query<(RowDataPacket & { status_id: number })[]>(
              "SELECT status_id FROM account WHERE user_id = ?",
              [token.user_id]
            );
            if (rows.length > 0) {
              token.status_id = rows[0].status_id;
            }
          } else if (token.company_id) {
            const [rows] = await db.query<(RowDataPacket & { status_id: number })[]>(
              "SELECT status_id FROM account WHERE company_id = ?",
              [token.company_id]
            );
            if (rows.length > 0) {
              token.status_id = rows[0].status_id;
            }
          }
        }

        return token;
      } catch (error) {
        console.log("JWT CALLBACK ERROR:", error);
        return token;
      }
    },
    async session({ session, token }) {
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
        (session as ExtendedSession).user.status_id = (
          token as ExtendedToken
        ).status_id;
        (session as ExtendedSession).user.isAdmin = (token as ExtendedToken).isAdmin || false;
        (session as ExtendedSession).user.username = (token as ExtendedToken).username;
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
