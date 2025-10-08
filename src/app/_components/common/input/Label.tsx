import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  id: string | undefined;
  children: ReactNode;
  className?: string;
};

export default function Label({id, children, className}: Props) {
  return (
    <label
      htmlFor={id}
      className={twMerge("text-sm font-medium", className)}
    >
      {children}
    </label>
  );
}
