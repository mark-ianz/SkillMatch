"use client";

import React, { useEffect } from "react";
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
  const { data: onboardingData } = useGetOnboardingOJT(
    session.data?.user.user_id
  );

  const setFarthestStep = useOnboardingStore((state) => state.setFarthestStep);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);

  useEffect(() => {
    // Populate the currentStep and farthestStep from onboardingData when it loads
    if (onboardingData) {
      console.log("Populating steps from onboarding data:", onboardingData);
      setFarthestStep(onboardingData.step);
      setCurrentStep(onboardingData.step);
    }
  }, [onboardingData, setCurrentStep, setFarthestStep]);

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
