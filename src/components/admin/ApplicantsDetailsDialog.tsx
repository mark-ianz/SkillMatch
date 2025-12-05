"use client";

import { ApplicantProfileAndUser } from "@/types/applicant_profile.types";
import { Account } from "@/types/user.types";
import ApplicantProfileDialog from "@/components/common/ApplicantProfileDialog";

interface ApplicantDetailsDialogProps {
  student: ApplicantProfileAndUser & Account;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApplicantDetailsDialog({
  student,
  open,
  onOpenChange,
}: ApplicantDetailsDialogProps) {
  return (
    <ApplicantProfileDialog
      applicant={student}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
