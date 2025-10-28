"use client";

import React from "react";
import Step1 from "./(steps)/Step1";
import useOnboardingStore from "@/store/OnboardingStore";
import Step2 from "./(steps)/Step2";
import Step3 from "./(steps)/Step3";
import { useSession } from "next-auth/react";
import { forbidden, unauthorized } from "next/navigation";

export default function FormInputs() {
  const session = useSession();

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
    </>
  );
}
