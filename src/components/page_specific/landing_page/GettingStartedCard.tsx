import { cn } from "@/lib/utils";
import React from "react";

interface GettingStartedCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function GettingStartedCard({
  icon,
  title,
  description,
  className = "",
}: GettingStartedCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border p-6 flex flex-col items-start justify-start gap-4 h-[300px]",
        className
      )}
    >
      <div className="flex justify-center items-center gap-4 w-full">{icon}</div>

      <div className="text-lg font-semibold text-slate-700">{title}</div>

      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
