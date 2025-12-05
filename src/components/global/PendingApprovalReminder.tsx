"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Clock } from "lucide-react";

const STATUS_PENDING = 2;

export default function PendingApprovalReminder() {
  const { data: session, update: updateSession } = useSession();
  const pathname = usePathname();

  const status_id = session?.user?.status_id;
  const isPending = status_id === STATUS_PENDING;

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

  // Periodically check session every 30 seconds if pending
  useEffect(() => {
    if (!isPending) return;

    const interval = setInterval(() => {
      updateSession();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isPending, updateSession]);

  useEffect(() => {
    // Only show if user is in pending approval status
    if (!isPending) return;

    // Don't show on auth pages
    if (pathname?.startsWith("/signin") || pathname?.startsWith("/signup"))
      return;

    // Don't show on onboarding pages
    if (pathname?.startsWith("/onboarding")) return;

    // Show persistent toast on every render/navigation
    toast(
      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-sm">Account Pending Approval</p>
          <p className="text-xs text-gray-600 mt-1">
            Your account is currently under review by our administrators. This usually takes 1-2 business days.
          </p>
        </div>
      </div>,
      {
        duration: Infinity, // Persistent toast
        position: "bottom-right",
        dismissible: true,
        id: "pending-approval-reminder", // Unique ID to prevent duplicates
      }
    );
  }, [isPending, pathname]);

  return null; // This component doesn't render anything
}
