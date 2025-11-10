import { CompanyAddress, CompanyPreview } from "./company.types";

export type WorkArrangement = "Remote" | "On-site" | "Hybrid";
/* type ShiftType = 'Day shift' | 'Night shift' | 'Flexible hours'; */

export type JobPost = CompanyPreview & CompanyAddress & {
  job_post_id: string;
  company_id: number;

  // Basic Info
  job_title: string;
  program_required: string[]; // e.g., ["BS Computer Science", "BS Information Technology"]
  job_categories?: string[];
  available_positions: number;
  
  // Work Details
  job_overview: string;
  job_responsibilities: string[];
  preferred_qualifications?: string;
  work_arrangement: WorkArrangement; // "Remote" | "On-site" | "Hybrid"
  is_paid: boolean;
  allowance_description?: string | null;

  // Skills
  soft_skills: string[];
  technical_skills: string[];
  created_at: string; // ISO string
  updated_at: string; // ISO string

  /* shift_type: ShiftType; */
  /* hours_per_week?: number; */
  /* working_days?: string; */
};

export type JobPostQuery = JobPost & {
  // mga string pa lang to kase na concat sila sa query
  job_responsibilities: string;
  soft_skills: string;
  technical_skills: string;
  program_required: string;
};
