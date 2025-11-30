import { AcademicDetails, User } from "./user.types";

export type ApplicantProfile = AcademicDetails & {
  applicant_id: number;
  user_id: number;
  resume_path: string | null;
  student_number: string | null;
  applicant_image_path: string | null;
  visibility: "public" | "private";
  skills: string[]; // processed na to, and array na
  preferred_schedule: string | null; // comma separated days: "Monday,Wednesday,Friday"
  required_hours: number | null; // total hours required (e.g., 400)
  created_at: Date;
};

export type ApplicantProfileQuery = Omit<ApplicantProfile, "skills"> & {
  skills: string; // comma separated string
};

export type ApplicantProfileAndUser = ApplicantProfile & User;
