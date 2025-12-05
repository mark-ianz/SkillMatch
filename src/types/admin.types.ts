/**
 * Role IDs:
 * 2 = admin
 * 3 = applicant
 * 4 = employer
 */

export type StatusOption = {
  value: number;
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
};

export type StatusColorConfig = {
  bg: string;
  text: string;
  label: string;
};

// Company account statuses (for admin panel)
export const COMPANY_ACCOUNT_STATUSES: StatusOption[] = [
  { value: 1, label: "Active", variant: "default" },
  { value: 2, label: "Pending", variant: "secondary" },
  { value: 3, label: "Rejected", variant: "destructive" },
  { value: 4, label: "Disabled", variant: "outline" },
];

// Job post statuses (for admin panel)
export const JOB_POST_STATUSES: StatusOption[] = [
  { value: 1, label: "Active", variant: "default" },
  { value: 2, label: "Pending", variant: "secondary" },
  { value: 3, label: "Rejected", variant: "destructive" },
  { value: 4, label: "Disabled", variant: "outline" },
];

// Enhanced status colors for company accounts
export const COMPANY_STATUS_COLORS: Record<number, StatusColorConfig> = {
  1: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  2: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
  3: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  4: { bg: "bg-gray-100", text: "text-gray-700", label: "Disabled" },
};

// Enhanced status colors for job posts
export const JOB_POST_STATUS_COLORS: Record<number, StatusColorConfig> = {
  1: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  2: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
  3: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  4: { bg: "bg-gray-100", text: "text-gray-700", label: "Disabled" },
};
