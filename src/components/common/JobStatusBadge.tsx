import { Badge } from "@/components/ui/badge";
import { JobPostStatusName, StatusName } from "@/types/status.types";
import { cn } from "@/lib/utils";

interface JobStatusBadgeProps {
  status: StatusName;
  className?: string;
}

const statusConfig: Record<
  JobPostStatusName,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  },
  disabled: {
    label: "Disabled",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200",
  },
  filled: {
    label: "Filled",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  },
  closed: {
    label: "Closed",
    className: "bg-slate-100 text-slate-800 hover:bg-slate-100 border-slate-200",
  },
  onboarding: {
    label: "Onboarding",
    className: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200",
  },
};

export function JobStatusBadge({ status, className }: JobStatusBadgeProps) {
  // Check if the status is a valid JobPostStatusName
  const isJobPostStatus = (
    statusValue: StatusName
  ): statusValue is JobPostStatusName => {
    const jobPostStatuses: JobPostStatusName[] = [
      "active",
      "pending",
      "rejected",
      "disabled",
      "filled",
      "closed",
      "onboarding",
    ];
    return jobPostStatuses.includes(statusValue as JobPostStatusName);
  };

  // Only render if the status is a JobPostStatusName
  if (!isJobPostStatus(status)) {
    return null;
  }

  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
