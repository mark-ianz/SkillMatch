"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  setShowResetConfirmDialog: (v: boolean) => void;
};

export default function FormActions({ setShowResetConfirmDialog }: Props) {
  return (
    <div className="flex gap-3">
      <Button type="submit" className="flex-1" size="lg">
        Post Job
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => setShowResetConfirmDialog(true)}
      >
        Reset
      </Button>
    </div>
  );
}
