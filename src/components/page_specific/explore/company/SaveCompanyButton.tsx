"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn, getRoleName } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { SignInPromptDialog } from "@/components/common/SignInPromptDialog";
import {
  useIsCompanySaved,
  useSaveCompany,
  useUnsaveCompany,
} from "@/hooks/query/useSavedItems";

interface SaveCompanyButtonProps {
  companyId: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export function SaveCompanyButton({
  companyId,
  className,
  variant = "ghost",
  size = "icon",
}: SaveCompanyButtonProps) {
  const { data: session } = useSession();
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const isSaved = useIsCompanySaved(companyId);
  const saveCompanyMutation = useSaveCompany();
  const unsaveCompanyMutation = useUnsaveCompany();

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
      unsaveCompanyMutation.mutate(companyId);
    } else {
      saveCompanyMutation.mutate(companyId);
    }
  };

  const isLoading = saveCompanyMutation.isPending || unsaveCompanyMutation.isPending;

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleSave}
        disabled={isLoading}
        className={cn("h-9 w-9", className)}
      >
        <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
      </Button>

      <SignInPromptDialog
        open={showSignInDialog}
        onOpenChange={setShowSignInDialog}
        title="Save this company for later"
        description="Sign in to save companies and access them anytime from your saved items."
      />
    </>
  );
}
