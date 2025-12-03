"use client";

import MainLayout from "@/components/layout/MainLayout";
import RenderSteps from "@/components/page_specific/onboarding/RenderSteps";
import Image from "next/image";
import ErrorArray from "@/components/common/ErrorArray";
import { cn, getStepDetails } from "@/lib/utils";
import TextLogo from "@/components/global/TextLogo";
import { useEffect, useState } from "react";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";

interface OnboardingClientLayoutProps {
  children: React.ReactNode;
  type: "applicant" | "employer";
}

export default function OnboardingClientLayout({
  children,
  type,
}: OnboardingClientLayoutProps) {
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const errors = useOnboardingStore((state) => state.error);

  const [currentStepDetails, setCurrentStepDetails] = useState(
    getStepDetails(currentStep, type)
  );

  // update current step details when currentStep changes
  useEffect(() => {
    setCurrentStepDetails(getStepDetails(currentStep, type));
  }, [currentStep, type]);

  return (
    <MainLayout className="items-center" wrapperClassName="w-full">
      <div className="flex container border rounded-md shadow-md min-h-[600px] max-w-7xl">
        <div
          className={cn(
            "w-1/3 shrink-0 rounded-l-md",
            type === "applicant"
              ? " bg-skillmatch-primary-green "
              : " bg-skillmatch-primary-blue"
          )}
        >
          <div className="flex flex-col gap-4 py-10 px-10">
            <div className="flex flex-col gap-12">
              <TextLogo />
              <p className="text-2xl text-skillmatch-light flex flex-col">
                Step {currentStep}
                <span className="text-sm">
                  {currentStepDetails?.description}
                </span>
              </p>
            </div>
            <RenderSteps type={type} />
          </div>
        </div>
        <div className="grow p-10 flex flex-col gap-10">
          <div className="flex flex-col">
            <div className="flex items-center justify-end">
              <Image
                width={75}
                height={75}
                src="/logo/SkillMatch.png"
                alt="SkillMatch Logo"
              />
            </div>
          </div>
          <ErrorArray error={errors} />
          {children}
        </div>
      </div>
    </MainLayout>
  );
}
