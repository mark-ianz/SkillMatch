"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

const STATUS_ONBOARDING = 7;
const ROLE_APPLICANT = 3;
const ROLE_COMPANY = 4;

export default function OnboardingReminder() {
  const { data: session, update: updateSession } = useSession();
  const pathname = usePathname();

  const status_id = session?.user?.status_id;
  const role_id = session?.user?.role_id;
  const isOnboarding = status_id === STATUS_ONBOARDING;

  // Refresh session when page becomes visible (tab focus)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateSession();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [updateSession]);

  useEffect(() => {
    // Only show if user is in onboarding status
    if (!isOnboarding || !role_id) return;

    // Don't show on onboarding pages
    if (pathname?.startsWith("/onboarding")) return;

    // Don't show on auth pages
    if (pathname?.startsWith("/signin") || pathname?.startsWith("/signup")) return;

    // Determine onboarding path
    const onboardingPath = role_id === ROLE_APPLICANT 
      ? "/onboarding/applicant" 
      : role_id === ROLE_COMPANY 
      ? "/onboarding/company"
      : "/onboarding/applicant";

    // Show persistent toast on every render/navigation
    toast(
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-sm">Complete Your Onboarding</p>
          <p className="text-xs text-gray-600 mt-1">
            Please finish setting up your profile to access all features.
          </p>
          <Link
            href={onboardingPath}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 underline mt-2 inline-block"
          >
            Continue Onboarding →
          </Link>
        </div>
      </div>,
      {
        duration: Infinity, // Persistent toast
        position: "bottom-right",
        dismissible: true,
        id: "onboarding-reminder", // Unique ID to prevent duplicates
      }
    );
  }, [isOnboarding, role_id, pathname]);

  return null; // This component doesn't render anything
}
