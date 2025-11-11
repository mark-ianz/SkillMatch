"use client";

import { Badge } from "@/components/ui/badge";
import { JobPost } from "@/types/job_post.types";
import { Clock, MapPin } from "lucide-react";
import DateDifference from "@/components/common/DateDifference";
import { cn } from "@/lib/utils";

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
  const fullAddress = `${job.barangay}, ${job.city_municipality}`;

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
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs font-medium">
          {job.available_positions} slot
          {job.available_positions > 1 ? "s" : ""}
        </Badge>
        {job.job_categories &&
          job.job_categories.slice(0, 2).map((category, index) => (
            <Badge
              key={category + index}
              variant="secondary"
              className="text-xs font-medium"
            >
              {category}
            </Badge>
          ))}

        {!job.is_paid && (
          <Badge variant="outline" className="text-xs">
            Unpaid
          </Badge>
        )}
      </div>

      {/* Job title */}
      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {job.job_title}
      </h3>

      {/* Company name */}
      <p className="text-sm text-muted-foreground mb-3">{job.company_name}</p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{fullAddress}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <DateDifference date={job.created_at} />
        </div>
      </div>

      {job.allowance_description && (
        <Badge variant="secondary" className="text-xs font-medium mt-2">
          {job.allowance_description}
        </Badge>
      )}
    </div>
  );
}
