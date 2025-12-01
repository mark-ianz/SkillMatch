"use client";

import MainLayout from "@/components/layout/MainLayout";
import AuthTabs from "@/components/auth/AuthTabs";
import React, { Suspense } from "react";
import signup_general from "@/images/auth/signup_general.jpg";
import signin_general from "@/images/auth/signin_general.jpg";
import { usePathname, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

function LayoutContent() {
  const pathName = usePathname();
  const searchQuery = useSearchParams();

  const isApplicant = searchQuery.get("type") === "applicant";
  const isSignup = pathName.includes("signup");

  const imageSrc = isSignup ? signup_general : signin_general;

  const tagline = isApplicant
    ? "Step Into the Workplace with Confidence and Purpose"
    : "Connecting You to the Next Generation of Professionals";
  const description = isApplicant
    ? "Seize opportunities, gain hands-on experience, and sharpen your skills to grow both personally and professionally."
    : "Discover talented individuals willing to contribute, collaborate, and grow their skills while contributing to success.";

  return (
    <MainLayout className="items-center justify-center -mt-10">
      <div className="container min-w-7xl max-w-7xl flex">
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

export default function Layout() {
  return (
    <Suspense
      fallback={
        <MainLayout className="items-center justify-center -mt-10">
          <div className="container min-w-7xl max-w-7xl flex">
            <div className="relative flex items-end w-1/2 rounded-l-md overflow-hidden bg-muted justify-center pb-14 h-[600px]">
              <div className="relative z-20 max-w-md text-center space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-4/5 mx-auto" />
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-background rounded-r-md p-8">
              <div className="space-y-6">
                <Skeleton className="h-10 w-48" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </MainLayout>
      }
    >
      <LayoutContent />
    </Suspense>
  );
}
