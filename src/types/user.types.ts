import { DefaultSession, User as NextAuthUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export type UserType = "applicant" | "company";

export type User = Address & {
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  gender: "male" | "female" | "prefer not to say";
  birthdate: Date | null | string;
  phone_number: string;
  created_at: Date;
};

export type Address = {
  house_number: string;
  street_name: string;
  subdivision: string | null;
  postal_code: string;
  barangay: string;
  city_municipality: string;
};

export type Account = {
  acccount_id: number;
  user_id: number | null;
  company_id: string | null;
  email: string;
  provider: "google" | "local" | "linkedin";
  provider_id: string;
  password_hash?: string;
  status_id: number;
  role_id: number;
  created_at: Date;
};

export type PublicAccount = Pick<Account, "email" | "role_id" | "status_id">;

export type AcademicDetails = {
  college: string | null;
  course: string;
  year_level: string | null;
  expected_graduation_year: string | null;
};

// JWT and Session Extensions
export type ExtendedInfo = {
  user_id?: number;
  role_id: number;
  company_id?: string;
  status_id?: number;
  rejected_reason?: string | null;
  username?: string;
  isAdmin?: boolean;
};

export type ExtendedUser = NextAuthUser & ExtendedInfo;

export type ExtendedAdapterUser = AdapterUser & ExtendedInfo;

export type ExtendedToken = JWT & ExtendedInfo;

export type ExtendedSession = DefaultSession & {
  user: ExtendedInfo;
};
