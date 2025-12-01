import { JobPostStatusId, JobPostStatusName } from "@/types/status.types";

export interface JobStatusConfig {
  label: string;
  className: string;
  bgColor: string;
  textColor: string;
}

export const jobStatusConfigByName: Record<JobPostStatusName, JobStatusConfig> = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
    bgColor: "bg-green-600",
    textColor: "text-green-800",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
    bgColor: "bg-yellow-600",
    textColor: "text-yellow-800",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
    bgColor: "bg-red-600",
    textColor: "text-red-800",
  },
  disabled: {
    label: "Disabled",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200",
    bgColor: "bg-gray-600",
    textColor: "text-gray-800",
  },
  filled: {
    label: "Filled",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
    bgColor: "bg-blue-600",
    textColor: "text-blue-800",
  },
  closed: {
    label: "Closed",
    className: "bg-slate-100 text-slate-800 hover:bg-slate-100 border-slate-200",
    bgColor: "bg-slate-600",
    textColor: "text-slate-800",
  },
  onboarding: {
    label: "Onboarding",
    className: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200",
    bgColor: "bg-purple-600",
    textColor: "text-purple-800",
  },
};

export const jobStatusConfigById: Record<JobPostStatusId, JobStatusConfig> = {
  1: jobStatusConfigByName.active,
  2: jobStatusConfigByName.pending,
  3: jobStatusConfigByName.rejected,
  4: jobStatusConfigByName.disabled,
  5: jobStatusConfigByName.filled,
  6: jobStatusConfigByName.closed,
  7: jobStatusConfigByName.onboarding,
  8: jobStatusConfigByName.active, // Not a job post status
  9: jobStatusConfigByName.active, // Not a job post status
  10: jobStatusConfigByName.active, // Not a job post status
  11: jobStatusConfigByName.active, // Not a job post status
  12: jobStatusConfigByName.active, // Not a job post status
  13: jobStatusConfigByName.active, // Not a job post status
  14: jobStatusConfigByName.active, // Not a job post status
};

export const getJobStatusConfig = (statusId: JobPostStatusId): JobStatusConfig => {
  return jobStatusConfigById[statusId] || jobStatusConfigByName.active;
};
