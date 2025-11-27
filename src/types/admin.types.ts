import { Company } from "./company.types";

/**
 * Role IDs:
 * 2 = admin
 * 3 = applicant
 * 4 = employer
 */

export type CompanyWithStatus = Company & {
  status_id: number;
  status_name: string;
  account_created_at: string;
};

export type StatusOption = {
  value: number;
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
};

// Company account statuses (for admin panel)
export const COMPANY_ACCOUNT_STATUSES: StatusOption[] = [
  { value: 1, label: "Active", variant: "default" },
  { value: 2, label: "Pending", variant: "secondary" },
  { value: 3, label: "Rejected", variant: "destructive" },
  { value: 4, label: "Disabled", variant: "outline" },
  { value: 7, label: "Onboarding", variant: "secondary" },
];

// Job post statuses (for admin panel)
export const JOB_POST_STATUSES: StatusOption[] = [
  { value: 1, label: "Active", variant: "default" },
  { value: 2, label: "Pending", variant: "secondary" },
  { value: 3, label: "Rejected", variant: "destructive" },
  { value: 4, label: "Disabled", variant: "outline" },
  { value: 5, label: "Filled", variant: "outline" },
  { value: 6, label: "Closed", variant: "outline" },
];
