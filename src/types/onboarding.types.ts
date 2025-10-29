import { Company } from "./company.types";
import { OJTProfile } from "./ojt_profile.types";
import { Skill } from "./skill.types";
import { AcademicDetails, PublicAccount, User } from "./user.types";

export type Onboarding = {
  onboarding_id: number;
  user_id: number | null;
  company_id: number | null;
  step: number;
  email: string;
  created_at: Date;
};

export type OnboardingStudentFullInfo = Onboarding &
  User &
  AcademicDetails &
  OJTProfile & { skills: Skill[] } & {
    role_id: number;
    status_id: number;
  };

export type OnboardingCompanyFullInfo = Onboarding & Company & PublicAccount;