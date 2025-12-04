"use client";

import { useSession } from "next-auth/react";
import { AlertCircle, X, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const STATUS_REJECTED = 3;

export default function RejectionReasonBanner() {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);

  const status_id = session?.user?.status_id;
  const rejected_reason = session?.user?.rejected_reason;
  const isRejected = status_id === STATUS_REJECTED;

  const handleResubmit = async () => {
    try {
      setIsResubmitting(true);
      await api.post("/company/resubmit");
      
      // Update session to reflect new status
      await updateSession();
      
      toast.success("Redirecting to onboarding...");
      
      // Redirect to onboarding
      router.push("/onboarding/company");
    } catch (error) {
      console.error("Resubmit error:", error);
      const err = error as { response?: { data?: { error?: string } } };
      const errorMessage = err?.response?.data?.error || "Failed to start resubmission";
      toast.error(errorMessage);
      setIsResubmitting(false);
    }
  };

  if (!isRejected || isDismissed) return null;

  return (
    <Alert variant="destructive" className="relative border-red-300 bg-red-50">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <AlertTitle className="text-red-800 font-semibold">
        Account Rejected - Action Required
      </AlertTitle>
      <AlertDescription className="text-red-700 mt-2">
        <div className="space-y-2">
          <p className="text-sm">
            Your account registration was rejected. Please review the reason below and resubmit your application with the correct information.
          </p>
          {rejected_reason && (
            <div className="bg-white/50 border border-red-200 rounded-md p-3 mt-3">
              <p className="text-sm font-medium text-red-800 mb-1">Rejection Reason:</p>
              <p className="text-sm text-red-700">{rejected_reason}</p>
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleResubmit}
              disabled={isResubmitting}
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              {isResubmitting ? "Processing..." : "Resubmit Application"}
            </Button>
          </div>
        </div>
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 text-red-600 hover:text-red-800 hover:bg-red-100"
        onClick={() => setIsDismissed(true)}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
}
