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
import { Clock } from "lucide-react";

export default function HeaderActions() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const role_id = session?.user?.role_id;
  const status_id = session?.user?.status_id;
  const role = getRoleName(role_id);
  const isOnboarding = status_id === 7;
  const isPending = status_id === 2;
  const isRejected = status_id === 3;

  // Determine user type based on current path
  const isCompanyPath = pathname?.startsWith("/company");
  const userType = isCompanyPath ? "company" : "applicant";

  // Only show loading on initial load (when there's no session data yet)
  // Not on tab switches/revalidations when session already exists
  if (status === "loading" && !session) {
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

  // Show pending approval text if user is awaiting admin approval
  if (role_id && isPending) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-md">
        <Clock className="w-4 h-4 text-orange-600" />
        <span className="text-xs sm:text-sm text-orange-700 font-medium">
          Account Pending Verification
        </span>
      </div>
    );
  }

  // Show rejected status for rejected companies
  if (role_id && isRejected) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-md">
        <Clock className="w-4 h-4 text-red-600" />
        <span className="text-xs sm:text-sm text-red-700 font-medium">
          Account Rejected
        </span>
      </div>
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
