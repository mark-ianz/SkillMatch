"use client";

import MainLayout from "@/components/layout/MainLayout";
import AuthTabs from "@/components/auth/AuthTabs";
import React from "react";
import signup_general from "@/images/auth/signup_general.jpg";
import signin_general from "@/images/auth/signin_general.jpg";
import { usePathname, useSearchParams } from "next/navigation";

export default function Layout() {
  const pathName = usePathname();
  const searchQuery = useSearchParams();

  const isOJT = searchQuery.get("type") === "ojt";
  const isSignup = pathName.includes("signup");

  const imageSrc = isSignup ? signup_general : signin_general;

  const tagline = isOJT
    ? "Step Into the Workplace with Confidence and Purpose"
    : "Connecting You to the Next Generation of Professionals";
  const description = isOJT
    ? "Seize opportunities, gain hands-on experience, and sharpen your skills to grow both personally and professionally."
    : "Discover talented individuals willing to contribute, collaborate, and grow their skills while contributing to success.";

  return (
    <MainLayout className="items-center justify-center -mt-10">
      <div className="w-full flex">
        <div
          className="relative flex items-end w-1/2 rounded-l-md overflow-hidden bg-cover bg-center justify-center pb-14"
          style={{ backgroundImage: `url(${imageSrc.src})` }}
        >
          {/* subtle dim overlay */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative text-skillmatch-light z-20 max-w-md text-center">
            <p className="text-3xl font-thin">{tagline}</p>
            <p className="mt-2 text-sm">{description}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <AuthTabs />
        </div>
      </div>
    </MainLayout>
  );
}
