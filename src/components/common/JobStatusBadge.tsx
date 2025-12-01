import { Badge } from "@/components/ui/badge";
import { JobPostStatusName, StatusName } from "@/types/status.types";
import { cn } from "@/lib/utils";
import { jobStatusConfigByName } from "@/const/jobStatusConfig";

interface JobStatusBadgeProps {
  status: StatusName;
  className?: string;
}

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

  const config = jobStatusConfigByName[status];

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
