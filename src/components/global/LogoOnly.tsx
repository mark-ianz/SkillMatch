import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import logo from "@/images/logo/SkillMatch.png";

export default function LogoOnly({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-10 w-10 flex-shrink-0", className)}>
      <Image
        fill
        src={logo}
        sizes="100px"
        alt="SkillMatch Logo Only"
        className="object-contain"
      />
    </div>
  );
}
