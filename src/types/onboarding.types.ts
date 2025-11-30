import { Company } from "./company.types";
import { ApplicantProfile } from "./applicant_profile.types";
import { SkillQuery } from "./skill.types";
import { AcademicDetails, PublicAccount, User } from "./user.types";

export type Onboarding = {
  onboarding_id: number;
  user_id: number | null;
  company_id: string | null;
  step: number;
  email: string;
  created_at: Date;
};

export type OnboardingStudentFullInfo = Onboarding &
  User &
  AcademicDetails &
  ApplicantProfile & SkillQuery & PublicAccount;

export type OnboardingCompanyFullInfo = Onboarding & Company & PublicAccount;