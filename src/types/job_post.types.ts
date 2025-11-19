import { CompanyAddress, CompanyPreview } from "./company.types";
import { JobPostStatusId, StatusName } from "./status.types";

export type WorkArrangement = "Remote" | "On-site" | "Hybrid";
/* type ShiftType = 'Day shift' | 'Night shift' | 'Flexible hours'; */

export type JobPost = CompanyPreview & CompanyAddress & {
  job_post_id: string;
  company_id: string;

  // Basic Info
  job_title: string;
  courses_required: string[]; // e.g., ["BS Computer Science", "BS Information Technology"]
  job_categories: string[];
  available_positions: number;
  job_post_status_id: JobPostStatusId; // 1-active, 2-pending, 3-rejected, 4-disabled, 5-filled, 6-closed, 7-onboarding
  job_post_status?: StatusName; // Computed field from job_post_status_id
  
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

  // Skill matching (optional, added for OJT users)
  skill_match_count?: number;
  course_matched?: boolean;

  /* shift_type: ShiftType; */
  /* hours_per_week?: number; */
  /* working_days?: string; */
};

export type JobPostQuery = JobPost & {
  // mga string pa lang to kase na concat sila sa query
  job_categories: string;
  job_responsibilities: string;
  soft_skills: string;
  technical_skills: string;
  courses_required: string;
};
