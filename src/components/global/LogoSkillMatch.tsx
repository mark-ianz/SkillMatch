import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";;

export default function LogoSkillMatch({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-14 w-full", className)}>
      <Image src="/logo/SkillMatchWithText.png" alt="SkillMatch Logo" fill className="object-contain"/>
    </div>
  );
}
