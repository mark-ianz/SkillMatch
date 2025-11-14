import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

export default function JobCategories({
  job_categories,
  className,
}: {
  job_categories: string[];
  className?: string;
}) {
  return (
    <>
      {job_categories.slice(0, 2).map((category, index) => (
        <Badge
          key={category + index}
          variant="secondary"
          className={cn("text-xs font-medium", className)}
        >
          {category}
        </Badge>
      ))}
    </>
  );
}
