import React from 'react'
import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function PaddedWrapper({ children, className }: Props) {
  return (
    <div className={twMerge("flex items-center w-8/12", className)}>
      {children}
    </div>
  )
}