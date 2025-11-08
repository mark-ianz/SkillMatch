"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  setShowResetConfirmDialog: (v: boolean) => void;
  isSubmitting?: boolean;
};

export default function FormActions({
  setShowResetConfirmDialog,
  isSubmitting = false,
}: Props) {
  return (
    <div className="flex gap-3">
      <Button
        variant={"default_employer"}
        type="submit"
        className="flex-1"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-muted-foreground" />
            Posting...
          </div>
        ) : (
          "Post Job"
        )}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => setShowResetConfirmDialog(true)}
        disabled={isSubmitting}
      >
        Reset
      </Button>
    </div>
  );
}
