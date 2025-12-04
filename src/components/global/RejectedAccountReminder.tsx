"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { XCircle, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const STATUS_REJECTED = 3;

export default function RejectedAccountReminder() {
  const { data: session, update: updateSession } = useSession();
  const pathname = usePathname();
  const [showReasonPopover, setShowReasonPopover] = useState(false);

  const status_id = session?.user?.status_id;
  const rejected_reason = session?.user?.rejected_reason;
  const isRejected = status_id === STATUS_REJECTED;

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
    // Only show if user is in rejected status
    if (!isRejected) return;

    // Don't show on auth pages
    if (pathname?.startsWith("/signin") || pathname?.startsWith("/signup"))
      return;

    // Don't show on onboarding pages
    if (pathname?.startsWith("/onboarding")) return;

    // Show persistent toast on every render/navigation
    toast(
      <div className="flex items-start gap-3">
        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-sm">Account Rejected</p>
          <p className="text-xs text-gray-600 mt-1">
            Your account registration has been rejected by our administrators.
          </p>
          {rejected_reason && (
            <Popover open={showReasonPopover} onOpenChange={setShowReasonPopover}>
              <PopoverTrigger asChild>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs text-red-600 hover:text-red-700 mt-2"
                >
                  <Info className="w-3 h-3 mr-1" />
                  View Reason
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-red-700">
                    Rejection Reason
                  </h4>
                  <p className="text-sm text-gray-700">{rejected_reason}</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    If you believe this is a mistake, please contact our support team.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>,
      {
        duration: Infinity, // Persistent toast
        position: "bottom-right",
        dismissible: true,
        id: "rejected-account-reminder", // Unique ID to prevent duplicates
      }
    );
  }, [isRejected, pathname, rejected_reason, showReasonPopover]);

  return null; // This component doesn't render anything
}
