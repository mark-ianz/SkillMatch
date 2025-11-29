import { AcademicDetails } from "./user.types";

export type OJTProfile = AcademicDetails & {
  ojt_id: number;
  user_id: number;
  resume_path: string | null;
  student_number: string | null;
  ojt_image_path: string | null;
  visibility: "public" | "private";
  skills: string[]; // processed na to, and array na
  preferred_schedule: string | null; // comma separated days: "Monday,Wednesday,Friday"
  required_hours: number | null; // total hours required (e.g., 400)
  created_at: Date;
};

export type OJTProfileQuery = Omit<OJTProfile, "skills"> & {
  skills: string; // comma separated string
};
