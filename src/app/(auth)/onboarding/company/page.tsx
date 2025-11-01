"use client";

import React from "react";
import Step1 from "./(steps)/Step1";
import useOnboardingStore from "@/store/OnboardingStore";
import Step2 from "./(steps)/Step2";
import Step3 from "./(steps)/Step3";
import { useSession } from "next-auth/react";
import { forbidden, unauthorized } from "next/navigation";
import { useGetOnboardingCompany } from "@/hooks/query/useOnboardingCompany";
import Step4 from "./(steps)/Step4";

export default function FormInputs() {
  const session = useSession();

  // No use of value, just to trigger data fetch and state setup
  useGetOnboardingCompany(session.data?.user.company_id);

  if (session.status === "unauthenticated") {
    unauthorized();
  }

  if (!session.data?.user.company_id && session.status !== "loading") {
    forbidden();
  }

  const currentStep = useOnboardingStore((state) => state.currentStep);

  return (
    <>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
      {currentStep === 4 && <Step4 />}
    </>
  );
}
