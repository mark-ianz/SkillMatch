"use client";

import { Badge } from "@/components/ui/badge";
import { JobPost } from "@/types/job_post.types";
import { Clock, MapPin } from "lucide-react";
import FeedPreviewWrapper from "../shared/FeedPreviewWrapper";

interface JobPostPreviewProps {
  job: JobPost;
  timePosted?: string;
  className?: string;
}

export function JobPostPreview({
  job,
  timePosted = "5 days ago",
  className,
}: JobPostPreviewProps) {
  const fullAddress = `${job.barangay}, ${job.city_municipality}`;

  return (
    <FeedPreviewWrapper exploreType="job-posts" id={job.job_post_id} className={className}>
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

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{fullAddress}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{timePosted}</span>
        </div>
      </div>

      {job.allowance_description && (
        <Badge variant="secondary" className="text-xs font-medium mt-2">
          {job.allowance_description}
        </Badge>
      )}
    </FeedPreviewWrapper>
  );
}
