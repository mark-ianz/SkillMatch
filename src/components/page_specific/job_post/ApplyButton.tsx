"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JobApplicationDialog } from "./JobApplicationDialog";
import { useApplyToJob } from "@/hooks/query/useApplications";
import { useSession } from "next-auth/react";
import { SignInPromptDialog } from "@/components/common/SignInPromptDialog";
import { ApplicationData } from "./JobApplicationDialog";
import { getRoleName } from "@/lib/utils";

interface ApplyButtonProps {
  jobPostId: string;
  jobTitle: string;
  companyName: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  fullWidth?: boolean;
}

export function ApplyButton({
  jobPostId,
  jobTitle,
  companyName,
  className,
  variant = "default",
  size = "default",
  fullWidth = false,
}: ApplyButtonProps) {
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const applyMutation = useApplyToJob();

  // Don't render the button if user is a Company
  const role = session?.user?.role_id ? getRoleName(session.user.role_id) : null;
  if (role === "Company") {
    return null;
  }

  const handleApplyClick = () => {
    if (!session) {
      setShowSignInDialog(true);
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
        className={className}
        variant={variant}
        size={size}
        disabled={applyMutation.isPending}
      >
        {applyMutation.isPending ? "Applying..." : "Apply Now"}
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
