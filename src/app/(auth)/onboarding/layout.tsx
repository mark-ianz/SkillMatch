"use client";

import QueryClientProviderWrapper from "@/components/global/QueryClientProviderWrapper";
import MainLayout from "@/components/layout/MainLayout";
import RenderSteps from "@/components/page_specific/onboarding/RenderSteps";
import Image from "next/image";
import ErrorArray from "@/components/common/ErrorArray";
import useSignupStore from "@/store/SignupStore";
import { getStepDetails } from "@/lib/utils";
import TextLogo from "@/components/global/TextLogo";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import { redirect, RedirectType } from "next/navigation";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const currentStep = useSignupStore((state) => state.currentStep);
  const errors = useSignupStore((state) => state.error);

  const [stepDetails, setStepDetails] = useState(getStepDetails(currentStep));

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
    <QueryClientProviderWrapper>
      <MainLayout className="items-center">
        <div className="flex w-full border rounded-md shadow-md">
          <div className="w-1/3 shrink-0 bg-skillmatch-primary-green rounded-l-md">
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
                <div className="flex flex-col gap-2">
                  <p className="text-4xl text-skillmatch-dark">
                    {stepDetails?.title}
                  </p>
                  <p>
                    <span className="text-red-500 mr-1">*</span>{" "}
                    <span className="text-sm text-skillmatch-muted-dark">
                      Indicates required fields
                    </span>
                  </p>
                </div>
                <ErrorArray error={errors} />
              </div>
            </div>
            <form>{children}</form>
          </div>
        </div>
      </MainLayout>
    </QueryClientProviderWrapper>
  );
}
