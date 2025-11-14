import { Badge } from "@/components/ui/badge";
import { JobPost } from "@/types/job_post.types";
import React from "react";
import MatchedBadges from "./MatchedBadges";
import JobCategories from "./JobCategories";

export default function JobPreviewHeader({ job }: { job: JobPost }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <MatchedBadges
        course_matched={job.course_matched}
        skill_match_count={job.skill_match_count}
      />

      <Badge variant="secondary" className="text-xs font-medium">
        {job.available_positions} slot
        {job.available_positions > 1 ? "s" : ""}
      </Badge>
      <JobCategories job_categories={job.job_categories} />

      {!job.is_paid && (
        <Badge variant="outline" className="text-xs">
          Unpaid
        </Badge>
      )}
    </div>
  );
}
