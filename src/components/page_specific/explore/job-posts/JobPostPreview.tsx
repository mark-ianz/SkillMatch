"use client";

import { JobPost } from "@/types/job_post.types";
import { cn } from "@/lib/utils";
import AllowanceDescription from "./sub-components/AllowanceDescription";
import JobPreviewHeader from "./sub-components/JobPreviewHeader";
import Location from "./sub-components/Location";
import DatePosted from "./sub-components/DatePosted";

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
        "group shadow-sm cursor-pointer rounded-lg border border-border/40 bg-background p-5 transition-all hover:border-border hover:shadow-sm",
        className,
        isSelected
          ? "border-skillmatch-primary-green hover:border-skillmatch-primary-green"
          : "border-border/40 hover:border-border"
      )}
    >
      <JobPreviewHeader job={job} />

      {/* Job title */}
      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {job.job_title}
      </h3>

      {/* Company name */}
      <p className="text-sm text-muted-foreground mb-4">{job.company_name}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <Location
          barangay={job.barangay}
          city_municipality={job.city_municipality}
        />
        <DatePosted created_at={job.created_at} />
      </div>

      <AllowanceDescription allowance_description={job.allowance_description} />
    </div>
  );
}
