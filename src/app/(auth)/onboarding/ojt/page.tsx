"use client";

import useSignupStore from "@/store/SignupStore";
import React, { useEffect } from "react";
import Step1 from "./(steps)/Step1";
import Step2 from "./(steps)/Step2";
import Step3 from "./(steps)/Step3";
import Step4 from "./(steps)/Step4";
import Step5 from "./(steps)/Step5";
import Step6 from "./(steps)/Step6";
import { useSession } from "next-auth/react";
import { useGetOnboarding } from "@/hooks/query/useOnboarding";

export default function FormInputs() {
  const session = useSession();
  const currentStep = useSignupStore((state) => state.currentStep);
  const { data: onboardingData } = useGetOnboarding(session.data?.user.user_id);

  const setFarthestStep = useSignupStore((state) => state.setFarthestStep);
  const setCurrentStep = useSignupStore((state) => state.setCurrentStep);

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
