import React from "react";
import { twMerge } from "tailwind-merge";

export default function HeaderText({
  children,
  className,
  text,
}: {
  children?: React.ReactNode;
  className?: string;
  text?: string;
}) {
  return <p className={twMerge("text-4xl", className)}>{text || children}</p>;
}
