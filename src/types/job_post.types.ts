import { JobPostStatusId, StatusName } from "./status.types";

export type WorkArrangement = "Remote" | "On-site" | "Hybrid";

export type JobPost = {
  job_post_id: string;
  company_id: string;

  // Basic Info (matching SQL schema exactly)
  job_title: string;
  work_arrangement: WorkArrangement; // "Remote" | "On-site" | "Hybrid"
  job_categories: string[]; // varchar(100) - comma separated in DB
  job_overview: string; // text
  available_positions: number; // smallint(6)
  courses_required: string[]; // text - comma separated in DB
  job_post_status_id: JobPostStatusId; // int(11) - 1-active, 2-pending, 3-rejected, 4-disabled, 5-filled, 6-closed
  job_post_status?: StatusName; // Computed field from status join
  
  // Responsibilities & Requirements
  job_responsibilities: string[]; // text - comma separated in DB
  preferred_qualifications?: string | null; // text
  
  // Skills
  technical_skills: string[]; // text - comma separated in DB
  soft_skills: string[]; // text - comma separated in DB
  
  // Location (matching SQL schema)
  street_name: string; // varchar(100)
  city_municipality: string; // varchar(255)
  barangay: string; // varchar(255)
  postal_code: string; // char(4)

  // Timestamps
  created_at: string; // timestamp - ISO string
  updated_at: string; // timestamp - ISO string

  // Optional computed fields from JOINs with company table
  company_name?: string;
  company_email?: string;
  company_image?: string;
  industry?: string[];

  // Optional computed fields (for Applicant users)
  skill_match_count?: number;
  course_matched?: boolean;
};

export type JobPostQuery = JobPost & {
  // mga string pa lang to kase na concat sila sa query
  job_categories: string;
  job_responsibilities: string;
  soft_skills: string;
  technical_skills: string;
  courses_required: string;
};