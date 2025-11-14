import { Badge } from "@/components/ui/badge";
import React from "react";

export default function AllowanceDescription({
  allowance_description,
}: {
  allowance_description: string | null | undefined;
}) {
  return (
    <>
      {allowance_description && (
        <Badge variant="secondary" className="text-xs font-medium mt-2">
          {allowance_description}
        </Badge>
      )}
    </>
  );
}
