import { Badge } from "@/components/ui/badge";
import { JobPost } from "@/types/job_post.types";
import { CheckCircle2, GraduationCap } from "lucide-react";
import React from "react";

export default function JobPreviewHeader({ job }: { job: JobPost }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {job.skill_match_count !== undefined && job.skill_match_count > 0 && (
        <Badge
          variant="default"
          className="text-xs font-medium bg-skillmatch-primary-green hover:bg-skillmatch-primary-green/90"
        >
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {job.skill_match_count} skill{job.skill_match_count > 1 ? "s" : ""}{" "}
          matched!
        </Badge>
      )}
      {job.course_matched && (
        <Badge
          variant="default"
          className="text-xs font-medium bg-skillmatch-primary-blue hover:bg-skillmatch-primary-blue/90"
        >
          <GraduationCap className="w-3 h-3 mr-1" />
          Course matched!
        </Badge>
      )}

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
  );
}
