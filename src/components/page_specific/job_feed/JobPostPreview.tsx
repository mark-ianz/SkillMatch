"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { JobPost } from "@/types/job_post.types";
import { Clock, MapPin } from "lucide-react";

interface JobPostPreviewProps {
  data: JobPost;
  onClick?: () => void;
  timePosted?: string;
  className?: string;
}

export function JobPostPreview({
  data,
  onClick,
  timePosted = "5 days ago",
  className,
}: JobPostPreviewProps) {
  const fullAddress = `${data.barangay}, ${data.city_municipality}`;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-lg border border-border/40 bg-background p-5 transition-all hover:border-border hover:shadow-sm",
        className
      )}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs font-medium">
          {data.available_positions} slot
          {data.available_positions > 1 ? "s" : ""}
        </Badge>
        {data.job_category &&
          data.job_category.slice(0, 2).map((category, index) => (
            <Badge
              key={category + index}
              variant="secondary"
              className="text-xs font-medium"
            >
              {category}
            </Badge>
          ))}

        {!data.is_paid && (
          <Badge variant="outline" className="text-xs">
            Unpaid
          </Badge>
        )}
      </div>

      {/* Job title */}
      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {data.job_title}
      </h3>

      {/* Company name */}
      <p className="text-sm text-muted-foreground mb-3">{data.company_name}</p>

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

      {data.allowance_description && (
        <Badge variant="secondary" className="text-xs font-medium mt-2">
          {data.allowance_description}
        </Badge>
      )}
    </div>
  );
}
