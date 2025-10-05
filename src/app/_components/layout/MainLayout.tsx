import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import PaddedWrapper from "../global/PaddedWrapper";

export default function MainLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={twMerge(
        "py-20",
        className,
        "h-[calc(100dvh-80px)] flex flex-col"
      )}
    >
      <PaddedWrapper className="flex items-center justify-center">{children}</PaddedWrapper>
    </main>
  );
}
