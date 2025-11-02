import { Loader2Icon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export default function LoadingGeneric({
  className,
  full,
}: {
  className?: string;
  full?: boolean;
}) {
  if (full) {
    return (
      <div className="flex items-center justify-center h-[100px]">
        <LoadingGeneric className="w-6 h-6" />
      </div>
    );
  }

  return (
    <Loader2Icon
      className={cn(
        "animate-spin w-12 h-12 text-skillmatch-muted-light",
        className
      )}
    />
  );
}
