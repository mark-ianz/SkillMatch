"use client";

import React from "react";
import Step1 from "./(steps)/Step1";
import useOnboardingStore from "@/store/OnboardingStore";

export default function FormInputs() {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  return <>{currentStep === 1 && <Step1 />}</>;
}
