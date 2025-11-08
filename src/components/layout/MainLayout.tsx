import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import PaddedWrapper from "../global/PaddedWrapper";

export default function MainLayout({
  children,
  className,
  wrapperClassName,
}: {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <main className={cn(className, "min-h-[calc(100dvh-80px)] flex flex-col")}>
      <PaddedWrapper className={cn("flex items-center justify-center py-20", wrapperClassName)}>
        {children}
      </PaddedWrapper>
    </main>
  );
}
