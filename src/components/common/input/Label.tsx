import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";;

type Props = {
  id: string | undefined;
  children: ReactNode;
  className?: string;
};

export default function Label({id, children, className}: Props) {
  return (
    <label
      htmlFor={id}
      className={cn("text-sm font-medium", className)}
    >
      {children}
    </label>
  );
}
