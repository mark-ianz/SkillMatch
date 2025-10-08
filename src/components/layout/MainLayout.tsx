import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";;
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
      className={cn(
        "py-20",
        className,
        "h-[calc(100dvh-80px)] flex flex-col"
      )}
    >
      <PaddedWrapper className="flex items-center justify-center">{children}</PaddedWrapper>
    </main>
  );
}
