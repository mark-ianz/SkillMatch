"use client";

import Link from "next/link";
import React from "react";
import LogoOnly from "./LogoOnly";
import TextLogo from "./TextLogo";
import { Roles } from "@/types/role.types";

export default function DynamicLogo({ role = "OJT" }: { role: Roles }) {
  const text = {
    ojt: "For OJT",
    company: "For Companies",
    admin: "For Admin",
  };

  const textToDisplay = text[role.toLowerCase() as keyof typeof text];

  return (
    <div className="flex items-center gap-4">
      <Link
        href={"/"}
        className="font-sans font-semibold text-2xl flex items-center gap-2"
      >
        <LogoOnly />
        <TextLogo className="text-skillmatch-dark" />
      </Link>
      <p className="text-sm italic text-skillmatch-muted-dark">
        {textToDisplay}
      </p>
    </div>
  );
}
