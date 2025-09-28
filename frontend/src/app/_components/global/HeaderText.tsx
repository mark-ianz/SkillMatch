import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function HeaderText({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <p className={twMerge("text-4xl", className)}>{children}</p>
  )
}
