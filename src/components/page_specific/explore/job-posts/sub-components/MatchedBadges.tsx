import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, GraduationCap } from "lucide-react";
import React from "react";

export default function MatchedBadges({
  skill_match_count,
  course_matched,
  className,
  badgeClassName,
}: {
  skill_match_count?: number;
  course_matched?: boolean;
  className?: string;
  badgeClassName?: string;
}) {
  return (
    <div className={cn("flex gap-1", className)}>
      {skill_match_count !== undefined && skill_match_count > 0 && (
        <Badge
          variant="default"
          className={cn("bg-skillmatch-primary-green hover:bg-skillmatch-primary-green/90", badgeClassName)}
        >
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {skill_match_count} skill{skill_match_count > 1 ? "s" : ""} matched!
        </Badge>
      )}
      {course_matched && (
        <Badge
          variant="default"
          className={cn("bg-skillmatch-primary-blue hover:bg-skillmatch-primary-blue/90", badgeClassName)}
        >
          <GraduationCap className="w-3 h-3 mr-1" />
          Course matched!
        </Badge>
      )}
    </div>
  );
}
