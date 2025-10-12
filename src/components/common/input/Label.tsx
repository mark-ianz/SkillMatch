import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id: string | undefined;
  children: ReactNode;
  className?: string;
  required?: boolean;
};

export default function Label({
  id,
  children,
  className,
  required,
}: Props) {
  return (
    <label htmlFor={id} className={cn("text-sm font-medium", className)}>
      {required && <span className="text-red-500 mr-1">*</span>}
      {children}
    </label>
  );
}
