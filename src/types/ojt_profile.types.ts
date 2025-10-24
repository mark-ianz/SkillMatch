import { AcademicDetails } from "./user.types";

export type OJTProfile = AcademicDetails & {
  ojt_id: number;
  user_id: number;
  resume_path: string | null;
  visibility: "public" | "private";
  created_at: Date;
}