"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn, getRoleName } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { SignInPromptDialog } from "@/components/common/SignInPromptDialog";
import {
  useIsJobSaved,
  useSaveJob,
  useUnsaveJob,
} from "@/hooks/query/useSavedItems";

interface SaveJobButtonProps {
  jobPostId: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export function SaveJobButton({
  jobPostId,
  className,
  variant = "ghost",
  size = "icon",
  showLabel = false,
}: SaveJobButtonProps) {
  const { data: session } = useSession();
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const isSaved = useIsJobSaved(jobPostId);
  const saveJobMutation = useSaveJob();
  const unsaveJobMutation = useUnsaveJob();

  // Don't render the button if user is a Company or Admin
  const role = session?.user?.role_id
    ? getRoleName(session.user.role_id)
    : null;
  if (role === "Company" || role === "Admin") {
    return null;
  }

  const handleSave = () => {
    if (!session) {
      setShowSignInDialog(true);
      return;
    }

    if (isSaved) {
      unsaveJobMutation.mutate(jobPostId);
    } else {
      saveJobMutation.mutate(jobPostId);
    }
  };

  const isLoading = saveJobMutation.isPending || unsaveJobMutation.isPending;

  return (
    <>
      <Button
        aria-label={isSaved ? "Unsave Job" : "Save Job"}
        variant={variant}
        size={size}
        onClick={handleSave}
        disabled={isLoading}
        className={cn(showLabel && "gap-2", className)}
      >
        <Bookmark className={cn("w-5 h-5", isSaved && "fill-current")} />
        {showLabel && (
          <span className="text-xs font-medium">
            {isSaved ? "Saved" : "Save"}
          </span>
        )}
      </Button>

      <SignInPromptDialog
        open={showSignInDialog}
        onOpenChange={setShowSignInDialog}
        title="Save this job for later"
        description="Sign in to save jobs and access them anytime from your saved items."
      />
    </>
  );
}
