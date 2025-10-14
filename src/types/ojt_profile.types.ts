export type OJTProfile = {
  ojt_id: number;
  user_id: number;
  college: string;
  course: string;
  year_level: "3rd year" | "4th year";
  expected_graduation_year: string;
  resume_path: string | null;
  visibility: "public" | "private";
  created_at: Date;
}