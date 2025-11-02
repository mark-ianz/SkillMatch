import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";;

export default function LogoOnly({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-10 w-10 flex-shrink-0", className)}>
      <Image src="/logo/SkillMatch.png" alt="SkillMatch Logo Only" fill className="object-contain" />
    </div>
  );
}
