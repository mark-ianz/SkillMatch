"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn, getRoleName } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { SignInPromptDialog } from "@/components/common/SignInPromptDialog";
import {
  useIsPostSaved,
  useSavePost,
  useUnsavePost,
} from "@/hooks/query/useSavedItems";

interface SavePostButtonProps {
  postId: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export function SavePostButton({
  postId,
  className,
  variant = "ghost",
  size = "sm",
  showLabel = true,
}: SavePostButtonProps) {
  const { data: session } = useSession();
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const isSaved = useIsPostSaved(postId);
  const savePostMutation = useSavePost();
  const unsavePostMutation = useUnsavePost();

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
      unsavePostMutation.mutate(postId);
    } else {
      savePostMutation.mutate(postId);
    }
  };

  const isLoading = savePostMutation.isPending || unsavePostMutation.isPending;

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleSave}
        disabled={isLoading}
        className={cn(
          showLabel && "gap-2",
          "text-skillmatch-muted-dark hover:text-foreground hover:bg-muted/50 transition-colors",
          className
        )}
      >
        <Bookmark
          className={cn(
            "w-4 h-4 transition-all",
            isSaved && "fill-current text-primary"
          )}
        />
        {showLabel && (
          <span className="text-xs font-medium">
            {isSaved ? "Saved" : "Save"}
          </span>
        )}
      </Button>

      <SignInPromptDialog
        open={showSignInDialog}
        onOpenChange={setShowSignInDialog}
        title="Save this post for later"
        description="Sign in to save posts and access them anytime from your saved items."
      />
    </>
  );
}
