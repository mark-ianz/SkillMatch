import { AcademicDetails } from "./user.types";

export type OJTProfile = AcademicDetails & {
  ojt_id: number;
  user_id: number;
  resume_path: string | null;
  student_id: string | null;
  visibility: "public" | "private";
  skills: string[]; // processed na to, and array na
  created_at: Date;
};

export type OJTProfileQuery = Omit<OJTProfile, "skills"> & {
  skills: string; // comma separated string
};
