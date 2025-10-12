"use client";

import LoadingGeneric from "@/components/global/LoadingGeneric";
import MainLayout from "@/components/layout/MainLayout";
import { useSession } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";
import React, { useEffect, useState } from "react";
import RenderSteps from "../../../components/page_specific/onboarding/RenderSteps";
import Step1 from "./(steps)/Step1";
import useSignupStore from "@/store/SignupStore";
import TextLogo from "@/components/global/TextLogo";
import Image from "next/image";
import { getStepDetails } from "@/lib/utils";
import Step2 from "./(steps)/Step2";
import ErrorArray from "@/components/common/ErrorArray";
import { useGetOnboarding } from "@/hooks/query/useOnboarding";
/* import useSignupStore from "@/app/store/SignupStore"; */

export default function Onboarding() {
  const session = useSession();
  const { data: onboardingData } = useGetOnboarding(session.data?.user.user_id);

  const farthestStep = useSignupStore((state) => state.farthestStep);
  const currentStep = useSignupStore((state) => state.currentStep);
  const errors = useSignupStore((state) => state.error);

  const setFarthestStep = useSignupStore((state) => state.setFarthestStep);
  const setCurrentStep = useSignupStore((state) => state.setCurrentStep);

  const [stepDetails, setStepDetails] = useState(getStepDetails(currentStep));

  useEffect(() => {
    // Populate the currentStep and farthestStep from onboardingData when it loads
    if (onboardingData) {
      console.log("Populating steps from onboarding data:", onboardingData);
      setFarthestStep(onboardingData.step);
      setCurrentStep(onboardingData.step);
    }
  }, [onboardingData, setCurrentStep, setFarthestStep]);

  console.log("Current Step:", currentStep);
  console.log("Farthest Step:", farthestStep);

  useEffect(() => {
    setStepDetails(getStepDetails(currentStep));
  }, [currentStep]);

  if (session.status === "loading") {
    return (
      <MainLayout className="items-center">
        <LoadingGeneric />
      </MainLayout>
    );
  }

  // redirect the user to signup if no session exists
  if (!session.data || !session.data.user) {
    redirect("/signup", RedirectType.replace);
  }

  return (
    <div className="flex w-full border rounded-md shadow-md">
      <div className="w-1/3 bg-skillmatch-primary-green rounded-l-md">
        <div className="flex flex-col gap-4 py-10 px-10">
          <div className="flex flex-col gap-12">
            <TextLogo />
            <p className="text-2xl text-skillmatch-light flex flex-col">
              Step {currentStep}
              <span className="text-sm">{stepDetails?.description}</span>
            </p>
          </div>
          <RenderSteps />
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
          <div className="flex flex-col gap-4">
            <p className="text-4xl text-skillmatch-dark">
              {stepDetails?.title}
            </p>
            <ErrorArray error={errors} />
          </div>
        </div>
        <form>
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
        </form>
      </div>
    </div>
  );
}
