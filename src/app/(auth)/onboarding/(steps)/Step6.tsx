"use client";

import React from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { Button } from "@/components/ui/button";
import useSignupStore from "@/store/SignupStore";
import { useSession } from "next-auth/react";
import { useUpdateStepSixOnboarding } from "@/hooks/query/useOnboarding";
import { onboardingStepSixSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import { formatZodError } from "@/lib/utils";
import PasswordInput from "@/components/common/input/PasswordInput";

export default function Step6() {
  const password = useSignupStore((s) => s.password);
  const confirm_password = useSignupStore((s) => s.confirm_password);
  const setPassword = useSignupStore((s) => s.setPassword);
  const setConfirmPassword = useSignupStore((s) => s.setConfirmPassword);
  const setError = useSignupStore((s) => s.setError);

  const session = useSession();
  const userId = session.data?.user?.user_id;
  const { mutate, isPending } = useUpdateStepSixOnboarding(userId);

  // PasswordInput manages visibility internally

  async function handleNext() {
    try {
      setError(null);
      const parsed = onboardingStepSixSchema.parse({ password: password.trim(), confirm_password: confirm_password.trim() });
      // call backend
      mutate(parsed);
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
        <Button disabled={isPending || password.trim() === ""} type="button" onClick={handleNext} className="w-24">
          {isPending ? "Saving..." : "Next"}
        </Button>
      </div>
    </StepContainer>
  );
}
