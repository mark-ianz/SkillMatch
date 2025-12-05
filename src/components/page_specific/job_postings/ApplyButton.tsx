"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JobApplicationDialog } from "./JobApplicationDialog";
import { useApplyToJob, useHasApplied } from "@/hooks/query/useApplications";
import { useSession } from "next-auth/react";
import { SignInPromptDialog } from "@/components/common/SignInPromptDialog";
import { ApplicationData } from "./JobApplicationDialog";
import { cn, getRoleName } from "@/lib/utils";
import { Check } from "lucide-react";

interface ApplyButtonProps {
  jobPostId: string;
  jobTitle: string;
  companyName: string;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ApplyButton({
  jobPostId,
  jobTitle,
  companyName,
  className,
  variant = "default",
  size = "default",
}: ApplyButtonProps) {
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const applyMutation = useApplyToJob();

  // Check if user has already applied (only when logged in)
  const { data: hasApplied } = useHasApplied(
    jobPostId,
    !!session?.user?.user_id
  );

  // Don't render the button if user is a Company or Admin
  const role = session?.user?.role_id
    ? getRoleName(session.user.role_id)
    : null;
  if (role === "Company" || role === "Admin") {
    return null;
  }

  const handleApplyClick = () => {
    if (!session) {
      setShowSignInDialog(true);
      return;
    }
    
    // Don't open dialog if already applied
    if (hasApplied) {
      return;
    }
    
    setIsDialogOpen(true);
  };

  const handleApplicationSubmit = async (formData: ApplicationData) => {
    if (!formData.resumePath) {
      return; // FileUploadField should handle validation
    }

    if (formData.proposedSchedule.length === 0) {
      return; // Form validation should prevent this
    }

    try {
      await applyMutation.mutateAsync({
        job_post_id: jobPostId,
        required_hours: Number(formData.hoursRequired),
        preferred_schedule: formData.proposedSchedule.join(","),
        resume_path: formData.resumePath,
      });

      setIsDialogOpen(false);
    } catch (error) {
      // Error is handled by the mutation's onError
      console.error("Application submission error:", error);
    }
  };

  return (
    <>
      <Button
        onClick={handleApplyClick}
        className={cn("w-full", className)}
        variant={hasApplied ? "outline" : variant}
        size={size}
        disabled={applyMutation.isPending || hasApplied}
      >
        {applyMutation.isPending ? (
          "Applying..."
        ) : hasApplied ? (
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Applied
          </span>
        ) : (
          "Apply Now"
        )}
      </Button>

      <JobApplicationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        jobTitle={jobTitle}
        companyName={companyName}
        onSubmit={handleApplicationSubmit}
      />

      <SignInPromptDialog
        open={showSignInDialog}
        onOpenChange={setShowSignInDialog}
        title="Apply to this job"
        description="Sign in to apply for this internship opportunity and track your application status."
      />
    </>
  );
}
