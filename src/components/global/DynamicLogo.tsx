import Link from "next/link";
import React from "react";
import LogoOnly from "./LogoOnly";
import TextLogo from "./TextLogo";
import { Roles } from "@/types/role.types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export default function DynamicLogo({ role }: { role?: Roles }) {
  const text = {
    ojt: "For Applicants",
    company: "For Companies",
    admin: "For Admin",
  };

  const textToDisplay = text[role?.toLowerCase() as keyof typeof text];

  return (
    <div className="flex items-center gap-4">
      <Link
        href={role === "OJT" ? "/" : role === "Company" ? "/company" : "/"}
        className="font-sans font-semibold text-2xl flex items-center gap-2"
      >
        <LogoOnly />
        <TextLogo className="text-skillmatch-dark" />
      </Link>
      {role && (
        <Badge
          variant="secondary"
          className={cn(
            "m-0 hidden sm:inline-flex border-skillmatch-primary-green",
            role === "Company" && "border-skillmatch-primary-blue",
            role === "Admin" && "border-skillmatch-primary-purple"
          )}
        >
          {textToDisplay}
        </Badge>
      )}
    </div>
  );
}
