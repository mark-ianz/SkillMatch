"use client";

import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { cn, getRoleName } from "@/lib/utils";
import NotificationPopover from "./NotificationPopover";
import ProfilePopover from "./ProfilePopover";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";

export default function HeaderActions() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const role_id = session?.user?.role_id;
  const status_id = session?.user?.status_id;
  const role = getRoleName(role_id);
  const isOnboarding = status_id === 7;

  // Determine user type based on current path
  const isCompanyPath = pathname?.startsWith("/company");
  const userType = isCompanyPath ? "company" : "applicant";

  if (status === "loading") {
    return (
      <>
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </>
    );
  }

  // Show "Complete Onboarding" button if user is in onboarding status
  if (role_id && isOnboarding) {
    const isOnboardingPage = pathname?.startsWith("/onboarding");
    if (isOnboardingPage) {
      return null; // Don't show button on onboarding pages
    }

    const onboardingPath = role_id === 3 
      ? "/onboarding/applicant" 
      : role_id === 4 
      ? "/onboarding/company"
      : "/onboarding/applicant";

    return (
      <Button
        asChild
        size="sm"
        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs sm:text-sm px-3 sm:px-4"
      >
        <Link href={onboardingPath}>Complete Onboarding</Link>
      </Button>
    );
  }

  if (!role_id) {
    return (
      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
          <Link href={`/signin?type=${userType}`}>Sign In</Link>
        </Button>
        <Button
          asChild
          size="sm"
          className={cn("bg-skillmatch-primary-green text-skillmatch-light hover:bg-skillmatch-primary-green/90 text-xs sm:text-sm px-2 sm:px-4", userType === "company" && "bg-skillmatch-primary-blue hover:bg-skillmatch-primary-blue/90")}
        >
          <Link href={`/signup?type=${userType}`}>Get Started</Link>
        </Button>
      </div>
    );
  }

  const isAdmin = session?.user?.isAdmin;

  if (role === "Applicant" || role === "Company" || isAdmin) {
    return (
      <div className="flex items-center gap-2">
        {!isAdmin && <NotificationPopover />}
        <ProfilePopover userType={role} />
      </div>
    );
  }
}
