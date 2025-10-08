import { Loader2Icon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";;

export default function LoadingGeneric({ className }: { className?: string }) {
  return <Loader2Icon className={cn("animate-spin w-12 h-12 text-skillmatch-muted-light", className)} />;
}
