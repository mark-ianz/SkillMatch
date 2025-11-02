import { CompanyProfile } from "./company.types";

type WorkArrangement = "Remote" | "On-site" | "Hybrid";
type ShiftType = 'Day shift' | 'Night shift' | 'Flexible hours';

export type JobPost = CompanyProfile & {
  job_post_id: number;
  company_id: number;
  job_title: string;
  work_arrangement: WorkArrangement;
  location?: string;
  job_category?: string;
  job_overview: string;
  job_responsibilities: string[];
  soft_skills: string[];
  preferred_qualifications?: string;
  is_paid: boolean;
  allowance_description?: string | null;
  shift_type: ShiftType;
  working_days?: string;
  hours_per_week?: number;
  technical_skills: string[];
  created_at: string; // ISO string
  updated_at: string; // ISO string
};

export type JobPostQuery = JobPost & {
  // mga string pa lang to kase na concat sila sa query
  job_responsibilities: string;
  soft_skills: string;
  technical_skills: string;
};
