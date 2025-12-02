import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LinkWithIcon({
  path,
  text,
  hasIcon = true,
  className,
  iconClassName,
}: {
  path: string;
  text: string;
  hasIcon?: boolean;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <Link
      href={path}
      target="_blank"
      className={cn(
        "text-2xl font-bold hover:text-green-600 transition-colors inline-flex items-center gap-2",
        className
      )}
    >
      {text}
      {hasIcon && <ExternalLink className={cn("h-5 w-5", iconClassName)} />}
    </Link>
  );
}
