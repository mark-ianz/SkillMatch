import React from 'react'
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function PaddedWrapper({ children, className }: Props) {
  return (
    <div className={cn("flex items-center", className)}>
      {children}
    </div>
  )
}