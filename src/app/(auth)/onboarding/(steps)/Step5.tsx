"use client";

import React, { useState } from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSignupStore from "@/store/SignupStore";
import { toast } from "sonner";
import SkipStep from "@/components/page_specific/onboarding/SkipStep";
import { useSession } from "next-auth/react";
import { useUpdateStepFiveOnboarding } from "@/hooks/query/useOnboarding";
import { X } from "lucide-react";

export default function Step5() {
  const session = useSession();

  const user_id = session.data?.user.user_id;

  const resume_path = useSignupStore((state) => state.resume_path);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allowed = ["application/pdf", "image/jpeg", "image/png"];
  const MAX_BYTES = 5 * 1024 * 1024; // 5MB
  const { mutateAsync, isPending } = useUpdateStepFiveOnboarding(user_id!);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const f = e.target.files?.[0] ?? null;
    if (!f) return setFile(null);
    if (!allowed.includes(f.type)) {
      setError("Only PDF, JPG and PNG files are allowed.");
      return setFile(null);
    }
    if (f.size > MAX_BYTES) {
      setError("File size exceeds 5MB limit.");
      return setFile(null);
    }
    setFile(f);
  }

  async function handleUpload() {
    if (!file) return setError("Please select a file first.");
    setError(null);
    try {
      const result = await mutateAsync(file);
      if (result.path) {
        const { setResumePath, setFarthestStep } = useSignupStore.getState();
        setResumePath(result.path);
        setFarthestStep(5);
        toast.success("Resume uploaded successfully");
      }
      setFile(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Upload error");
    }
  }

  return (
    <StepContainer>
      <div className="flex flex-col gap-4 border rounded-md shadow-sm p-4">
        <label className="text-sm">Upload your resume (PDF, JPG, PNG)</label>
        <Input
          type="file"
          onChange={handleFile}
          accept=".pdf,.jpg,.jpeg,.png"
        />

        {file && <p className="text-sm">Selected: {file.name}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {resume_path && (
          <div className="flex items-center gap-4">
            <a
              href={resume_path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-skillmatch-primary-green underline"
            >
              Click to view
            </a>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => {
                const { clearResume } = useSignupStore.getState();
                clearResume();
              }}
            >
              Clear
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-2">
        <SkipStep />
        <Button
          className="w-24"
          disabled={isPending}
          type="button"
          onClick={handleUpload}
        >
          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </StepContainer>
  );
}
