export type User = {
  user_id: number;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  gender: "male" | "female" | "prefer not to say";
  birthdate: Date;
  street_address?: string | null;
  barangay?: string | null;
  city?: string | null;
  municipality?: string | null;
  phone_number: string;
  role_id: number;
  status_id: number;
  created_at: Date;
};

export type Onboarding = {
  onboarding_id: number;
  user_id: number;
  step: number;
  email: string;
  created_at: Date;
};

import { DefaultSession, User as NextAuthUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export type ExtendedInfo = {
  user_id: number;
  role_id: number;
};

export type ExtendedUser = NextAuthUser & ExtendedInfo;

export type ExtendedAdapterUser = AdapterUser & ExtendedInfo;

export type ExtendedToken = JWT & ExtendedInfo;

export type ExtendedSession = DefaultSession & {
  user: ExtendedInfo;
};
