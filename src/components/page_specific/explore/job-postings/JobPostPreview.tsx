"use client";

import { JobPost } from "@/types/job_post.types";
import { cn } from "@/lib/utils";
import JobPreviewHeader from "./sub-components/JobPreviewHeader";
import Location from "./sub-components/Location";
import DatePosted from "./sub-components/DatePosted";
import { JobStatusBadge } from "@/components/common/JobStatusBadge";

interface JobPostPreviewProps {
  job: JobPost;
  className?: string;
  isSelected?: boolean;
}

export function JobPostPreview({
  job,
  className,
  isSelected = false,
}: JobPostPreviewProps) {
  return (
    <div
      className={cn(
        "group shadow-sm cursor-pointer rounded-lg border border-border/40 bg-background p-5 transition-all hover:border-border hover:shadow-sm hover:scale-[1.01]",
        className,
        isSelected
          ? "border-skillmatch-primary-green hover:border-skillmatch-primary-green"
          : "border-border/40 hover:border-border"
      )}
    >
      <JobPreviewHeader job={job} />

      {/* Job title */}
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {job.job_title}
        </h3>
        {job.job_post_status && <JobStatusBadge status={job.job_post_status} />}
      </div>

      {/* Company name and Status */}
      <p className="text-sm text-muted-foreground mb-4">
        {job.company_name}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <Location
          barangay={job.barangay}
          city_municipality={job.city_municipality}
        />
        <DatePosted created_at={job.created_at} />
      </div>
    </div>
  );
}
