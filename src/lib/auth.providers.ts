import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "./db";
import { ExtendedUser } from "@/types/user.types";
import { RowDataPacket } from "mysql2";

interface AccountRow {
  account_id: number;
  email: string;
  password_hash: string | null;
  user_id: number | null;
  role_id: number;
  status_id: number;
  company_id: string | null;
}

// Applicant Credentials Provider
export const applicantCredentialsProvider = CredentialsProvider({
  id: "applicant-credentials",
  name: "Applicant Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Email and password are required");
    }

    try {
      const [accounts] = await db.query<(AccountRow & RowDataPacket)[]>(
        "SELECT * FROM account WHERE email = ? AND role_id = 3",
        [credentials.email]
      );

      if (!accounts || accounts.length === 0) {
        throw new Error("No account found with this email");
      }

      const account = accounts[0];

      if (!account.password_hash) {
        throw new Error("Please sign in with Google");
      }

      const isValid = await bcrypt.compare(
        credentials.password,
        account.password_hash
      );

      if (!isValid) {
        throw new Error("Invalid password");
      }

      return {
        id: account.account_id.toString(),
        email: account.email,
        user_id: account.user_id,
        role_id: account.role_id,
        status_id: account.status_id,
        company_id: account.company_id,
      } as ExtendedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed";
      throw new Error(errorMessage);
    }
  },
});

// Company Credentials Provider
export const companyCredentialsProvider = CredentialsProvider({
  id: "company-credentials",
  name: "Company Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Email and password are required");
    }

    try {
      const [accounts] = await db.query<(AccountRow & RowDataPacket)[]>(
        "SELECT * FROM account WHERE email = ? AND role_id = 4",
        [credentials.email]
      );

      if (!accounts || accounts.length === 0) {
        throw new Error("No account found with this email");
      }

      const account = accounts[0];

      if (!account.password_hash) {
        throw new Error("Please sign in with Google");
      }

      const isValid = await bcrypt.compare(
        credentials.password,
        account.password_hash
      );

      if (!isValid) {
        throw new Error("Invalid password");
      }

      return {
        id: account.account_id.toString(),
        email: account.email,
        user_id: account.user_id,
        role_id: account.role_id,
        status_id: account.status_id,
        company_id: account.company_id,
      } as ExtendedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed";
      throw new Error(errorMessage);
    }
  },
});

// Google Applicant Sign In Provider
export const googleApplicantSignInProvider = GoogleProvider({
  id: "google-applicant-signin",
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  issuer: "https://accounts.google.com",
  wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
});

// Google Applicant Sign Up Provider
export const googleApplicantSignUpProvider = GoogleProvider({
  id: "google-applicant-signup",
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  issuer: "https://accounts.google.com",
  wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
});

// Google Company Sign In Provider
export const googleCompanySignInProvider = GoogleProvider({
  id: "google-company-signin",
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  issuer: "https://accounts.google.com",
  wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
});

// Google Company Sign Up Provider
export const googleCompanySignUpProvider = GoogleProvider({
  id: "google-company-signup",
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  issuer: "https://accounts.google.com",
  wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
});
