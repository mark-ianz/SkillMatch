"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { XCircle, Info, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";

const STATUS_REJECTED = 3;

export default function RejectedAccountReminder() {
  const { data: session, update: updateSession } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [showReasonPopover, setShowReasonPopover] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);

  const status_id = session?.user?.status_id;
  const rejected_reason = session?.user?.rejected_reason;
  const isRejected = status_id === STATUS_REJECTED;

  const handleResubmit = useCallback(async () => {
    try {
      setIsResubmitting(true);
      await api.post("/company/resubmit");
      
      // Update session to reflect new status
      await updateSession();
      
      toast.success("You can now resubmit your application");
      
      // Redirect to onboarding
      router.push("/onboarding/company");
    } catch (error) {
      console.error("Resubmit error:", error);
      const err = error as { response?: { data?: { error?: string } } };
      const errorMessage = err?.response?.data?.error || "Failed to start resubmission";
      toast.error(errorMessage);
    } finally {
      setIsResubmitting(false);
    }
  }, [updateSession, router]);

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
            <>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs text-red-600 hover:text-red-700 mt-2"
                onClick={() => setShowReasonPopover(!showReasonPopover)}
              >
                <Info className="w-3 h-3 mr-1" />
                View Reason
              </Button>
              {showReasonPopover && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                  <h4 className="font-semibold text-xs text-red-700 mb-2">
                    Rejection Reason:
                  </h4>
                  <p className="text-xs text-gray-700 mb-3">{rejected_reason}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Please review and correct the issues mentioned above, then resubmit your application.
                  </p>
                  <Button
                    onClick={handleResubmit}
                    disabled={isResubmitting}
                    className="w-full"
                    size="sm"
                    variant={"default_employer"}
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    {isResubmitting ? "Processing..." : "Resubmit Application"}
                  </Button>
                </div>
              )}
            </>
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
  }, [isRejected, pathname, rejected_reason, showReasonPopover, handleResubmit, isResubmitting]);

  return null; // This component doesn't render anything
}
