"use client";

import React from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUpdateStepSixOnboardingApplicant } from "@/hooks/query/useOnboardingApplicant";
import { ZodError } from "zod";
import { formatZodError } from "@/lib/utils";
import PasswordInput from "@/components/common/input/PasswordInput";
import { api } from "@/lib/axios";
import { onboardingPasswordSchema } from "@/schema/onboarding";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";

export default function Step6() {
  const password = useOnboardingStore((s) => s.password);
  const confirm_password = useOnboardingStore((s) => s.confirm_password);
  const setPassword = useOnboardingStore((s) => s.setPassword);
  const setConfirmPassword = useOnboardingStore((s) => s.setConfirmPassword);
  const setError = useOnboardingStore((s) => s.setError);

  const { data: sessionData, update: updateSession } = useSession();
  const userId = sessionData?.user?.user_id;
  const router = useRouter();
  const { mutate, isPending } = useUpdateStepSixOnboardingApplicant(userId);
  const farthestStep = useOnboardingStore((s) => s.farthestStep);
  const nextStep = useOnboardingStore((s) => s.nextStep);

  // PasswordInput manages visibility internally

  async function handleNext() {
    try {
      setError(null);
      const parsed = onboardingPasswordSchema.parse({ password: password.trim(), confirm_password: confirm_password.trim() });
      // call backend
      mutate(parsed, {
        onSuccess: async () => {
          // Update session to reflect new status_id
          await updateSession();
          
          // increment locally then navigate to profile after successful finalization
          nextStep();
          router.push("/feed");
        },
        onError: (err) => {
          const msg = err instanceof Error ? err.message : String(err);
          setError([msg]);
        },
      });
    } catch (err) {
      // zod validation error
      if (err instanceof ZodError) {
        setError(formatZodError(err));
        return;
      }

      // mutation or other error
      const msg = err instanceof Error ? err.message : String(err);
      setError([msg]);
    }
  }

  return (
    <StepContainer>
      <div className="flex flex-col gap-4 rounded-md">
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          required
        />

        <PasswordInput
          id="confirm_password"
          label="Confirm Password"
          value={confirm_password}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          required
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant={"outline"}
          onClick={async () => {
            // finalize on server then advance locally and redirect
            if (!userId) return;
            try {
              setError(null);
              await api.post(`/onboarding/${userId}/submit/${farthestStep}/step-six-skip`);
              
              // Update session to reflect new status_id
              await updateSession();
              
              nextStep();
              router.push("/feed");
            } catch (err) {
              console.error("Failed to finalize onboarding on skip:", err);
              const msg = err instanceof Error ? err.message : String(err);
              setError([msg]);
            }
          }}
        >
          Skip
        </Button>
        <Button disabled={isPending || password.trim() === ""} type="button" onClick={handleNext} className="w-24">
          {isPending ? "Saving..." : "Next"}
        </Button>
      </div>
    </StepContainer>
  );
}
