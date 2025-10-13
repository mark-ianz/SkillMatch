import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import PaddedWrapper from "../global/PaddedWrapper";

export default function MainLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn(className, "h-[calc(100dvh-80px)] flex flex-col")}>
      <PaddedWrapper className="flex items-center justify-center py-20">
        {children}
      </PaddedWrapper>
    </main>
  );
}
