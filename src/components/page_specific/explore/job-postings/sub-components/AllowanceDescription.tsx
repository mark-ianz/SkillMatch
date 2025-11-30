import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

export default function AllowanceDescription({
  allowance_description,
  className
}: {
  allowance_description: string | null | undefined;
  className?: string;
}) {
  return (
    <>
      {allowance_description && (
        <Badge variant="secondary" className={cn("text-xs font-medium", className)}>
          {allowance_description}
        </Badge>
      )}
    </>
  );
}
