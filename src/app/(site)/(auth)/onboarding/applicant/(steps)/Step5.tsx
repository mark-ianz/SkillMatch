"use client";

import React from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
// Button not required here; FileUploadField includes its own action button
import { toast } from "sonner";
import SkipStep from "@/components/page_specific/onboarding/SkipStep";
import { useSession } from "next-auth/react";
import { useUpdateStepFiveOnboardingApplicant } from "@/hooks/query/useOnboardingApplicant";
import { api } from "@/lib/axios";
import useApplicantProfileStore from "@/store/onboarding/applicant.onboarding.store";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";
import FileUploadField from "@/components/common/input/FileUploadField";

export default function Step5() {
  const session = useSession();

  const user_id = session.data?.user.user_id;

  const resume_path = useApplicantProfileStore((state) => state.resume_path);

  const { mutateAsync } = useUpdateStepFiveOnboardingApplicant(user_id!);

  async function handleUploadFile(f: File) {
    const result = await mutateAsync(f);
    if (result.path) {
      const setResumePath = useApplicantProfileStore.getState().setResumePath;
      const setFarthestStep = useOnboardingStore.getState().setFarthestStep;
      setResumePath(result.path);
      setFarthestStep(5);
      toast.success("Resume uploaded successfully");
    }
    return result;
  }

  async function handleClearResume() {
    const { clearResume } = useApplicantProfileStore.getState();
    const user_id = session.data?.user.user_id;
    // optimistically clear
    clearResume();
    if (!user_id) return;
    try {
      await api.post(`/applicant/resume/delete`, { user_id });
    } catch (err) {
      console.error("Failed to delete resume on server:", err);
    }
  }

  return (
    <StepContainer>
      <div className="flex flex-col gap-4 rounded-md">
        <FileUploadField
          id="resume"
          label={"Upload your resume (PDF, JPG, PNG)"}
          accept=".pdf,.jpg,.jpeg,.png"
          currentPath={resume_path ?? null}
          onUpload={handleUploadFile}
          onClear={handleClearResume}
          optional
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <SkipStep />
      </div>
    </StepContainer>
  );
}
