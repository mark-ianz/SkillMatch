import DateDifference from "@/components/common/DateDifference";
import { Clock } from "lucide-react";
import React from "react";

export default function DatePosted({ created_at }: { created_at: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Clock className="w-4 h-4" />
      <DateDifference date={created_at} />
    </div>
  );
}
