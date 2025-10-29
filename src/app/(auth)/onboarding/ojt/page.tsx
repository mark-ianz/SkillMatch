"use client";

import React from "react";
import Step1 from "./(steps)/Step1";
import Step2 from "./(steps)/Step2";
import Step3 from "./(steps)/Step3";
import Step4 from "./(steps)/Step4";
import Step5 from "./(steps)/Step5";
import Step6 from "./(steps)/Step6";
import { useSession } from "next-auth/react";
import { useGetOnboardingOJT } from "@/hooks/query/useOnboardingOJT";
import useOnboardingStore from "@/store/OnboardingStore";

export default function FormInputs() {
  const session = useSession();
  const currentStep = useOnboardingStore((state) => state.currentStep);

  // No use of value, just to trigger data fetch and state setup
  useGetOnboardingOJT(session.data?.user.user_id);

  return (
    <>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
      {currentStep === 4 && <Step4 />}
      {currentStep === 5 && <Step5 />}
      {currentStep === 6 && <Step6 />}
    </>
  );
}
