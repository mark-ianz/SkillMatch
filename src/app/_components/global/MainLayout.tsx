import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function MainLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={twMerge("px-96 py-10", className)}>{children}</main>;
}
