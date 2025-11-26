// Application status types
export type ApplicationStatusId = 8 | 9 | 10 | 11 | 12 | 3; // 3 = rejected (reused)
export type CompanyApplicationStatusId = 8 | 13 | 14 | 9 | 10 | 3;

export type ApplicationStatusName =
  | "applied"              // 8
  | "interview_scheduled"  // 9
  | "offer_sent"          // 10
  | "offer_accepted"      // 11
  | "offer_declined"      // 12
  | "rejected";           // 3

export type CompanyApplicationStatusName =
  | "applied"       // 8
  | "shortlisted"   // 13
  | "on_hold"       // 14
  | "interview_scheduled"  // 9
  | "offer_sent"    // 10
  | "rejected";     // 3

export interface Application {
  application_id: string;
  user_id: number;
  job_post_id: string;
  
  // Status fields
  application_status_id: ApplicationStatusId;
  company_status_id: CompanyApplicationStatusId;
  
  // Application details
  applied_date: string;
  last_update: string;
  
  // Internship requirements
  required_hours: number;
  preferred_schedule: string; // Comma-separated days (e.g., "Monday,Wednesday,Friday")
  
  // Interview details
  interview_date?: string | null;
  interview_type?: "virtual" | "in-person" | null;
  interview_link?: string | null;
  interview_code?: string | null;
  interview_notes?: string | null;
  
  // Offer details
  offer_sent_date?: string | null;
  offer_deadline?: string | null;
  offer_response_date?: string | null;
  
  // Additional info
  resume_path?: string | null;
  rejection_reason?: string | null;
  company_notes?: string | null;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// Application with job post details (for user view)
export interface ApplicationWithJobDetails extends Application {
  job_title: string;
  company_name: string;
  company_image?: string | null;
  work_arrangement: string;
  city_municipality: string;
  barangay: string;
}

// Application with user details (for company view)
export interface ApplicationWithUserDetails extends Application {
  user_name: string;
  user_email: string;
  course?: string | null;
  skills?: string | null;
}

// Helper functions
export const getApplicationStatusName = (status_id: ApplicationStatusId): ApplicationStatusName => {
  const statusMap: Record<ApplicationStatusId, ApplicationStatusName> = {
    8: "applied",
    9: "interview_scheduled",
    10: "offer_sent",
    11: "offer_accepted",
    12: "offer_declined",
    3: "rejected",
  };
  return statusMap[status_id];
};

export const getApplicationStatusId = (status_name: ApplicationStatusName): ApplicationStatusId => {
  const statusMap: Record<ApplicationStatusName, ApplicationStatusId> = {
    applied: 8,
    interview_scheduled: 9,
    offer_sent: 10,
    offer_accepted: 11,
    offer_declined: 12,
    rejected: 3,
  };
  return statusMap[status_name];
};

export const getCompanyStatusName = (status_id: CompanyApplicationStatusId): CompanyApplicationStatusName => {
  const statusMap: Record<CompanyApplicationStatusId, CompanyApplicationStatusName> = {
    8: "applied",
    13: "shortlisted",
    14: "on_hold",
    9: "interview_scheduled",
    10: "offer_sent",
    3: "rejected",
  };
  return statusMap[status_id];
};

export const getCompanyStatusId = (status_name: CompanyApplicationStatusName): CompanyApplicationStatusId => {
  const statusMap: Record<CompanyApplicationStatusName, CompanyApplicationStatusId> = {
    applied: 8,
    shortlisted: 13,
    on_hold: 14,
    interview_scheduled: 9,
    offer_sent: 10,
    rejected: 3,
  };
  return statusMap[status_name];
};
