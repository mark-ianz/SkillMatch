import { DefaultSession, User as NextAuthUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export type User = {
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  gender: "male" | "female" | "prefer not to say";
  birthdate: Date;
  street_name: string;
  house_number: string;
  subdivision: string | null;
  postal_code: string;
  barangay: string;
  city: string;
  municipality: string;
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

export type Account = {
  acccount_id: number;
  user_id: number;
  email: string;
  profile_image?: string;
  provider: "google" | "local" | "linkedin";
  provider_id: string;
  password_hash?: string;
  created_at: Date;
};

export type OnboardingFullInfo = Onboarding &
  User & {
    email: string;
    street_name: string | null;
    barangay: string | null;
    city: string | null;
    municipality: string | null;
  };

// JWT and Session Extensions
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
