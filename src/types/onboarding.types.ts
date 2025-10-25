import { OJTProfile } from "./ojt_profile.types";
import { Skill } from "./skill.types";
import { AcademicDetails, User } from "./user.types";

export type Onboarding = {
  onboarding_id: number;
  user_id: number;
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
