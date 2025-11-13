import { Button } from "@/components/ui/button";
import React from "react";
import { useSession } from "next-auth/react";
import { api } from "@/lib/axios";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";

export default function SkipStep() {
  const nextStep = useOnboardingStore((state) => state.nextStep);
  const farthestStep = useOnboardingStore((state) => state.farthestStep);
  const session = useSession();

  async function handleSkip() {
    const userId = session.data?.user?.user_id;
    // local fallback
    nextStep();

    if (!userId) return;

    try {
      await api.post(`/onboarding/${userId}/submit/${farthestStep}/skip`);
      // on success, advance local state as well (already done)
    } catch (error) {
      // If backend fails, we don't want to block local progression but log
      console.error("Failed to skip step on server:", error);
    }
  }

  return (
    <Button className="w-24" variant={"outline"} onClick={handleSkip}>
      Skip
    </Button>
  );
}
