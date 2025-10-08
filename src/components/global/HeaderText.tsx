import React from "react";
import { cn } from "@/lib/utils";;

export default function HeaderText({
  children,
  className,
  text,
}: {
  children?: React.ReactNode;
  className?: string;
  text?: string;
}) {
  return <p className={cn("text-4xl", className)}>{text || children}</p>;
}
