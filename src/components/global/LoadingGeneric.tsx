import { Loader2Icon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function LoadingGeneric({ className }: { className?: string }) {
  return <Loader2Icon className={twMerge("animate-spin w-12 h-12 text-skillmatch-muted-light", className)} />;
}
