"use client";

import Link from "next/link";
import React from "react";
import LogoOnly from "./LogoOnly";
import TextLogo from "./TextLogo";
import { usePathname } from "next/navigation";

export default function DynamicLogo() {
  const pathName = usePathname();

  const text = {
    ojt: "For OJT",
    company: "For Companies",
    admin: "For Admin",
  }

  const isOJT = !pathName?.includes("/company") || pathName.includes("/ojt");
  const isCompany = pathName?.includes("/company");
  const isAdmin = pathName?.includes("/admin");

  const role = isOJT ? "ojt" : isCompany ? "company" : isAdmin ? "admin" : "ojt";

  return (
    <div className="flex items-center gap-4">
      <Link
        href={"/"}
        className="font-sans font-semibold text-2xl flex items-center gap-2"
      >
        <LogoOnly />
        <TextLogo className="text-skillmatch-dark" />
      </Link>
      <p className="text-sm italic text-skillmatch-muted-dark">{text[role]}</p>
    </div>
  );
}
