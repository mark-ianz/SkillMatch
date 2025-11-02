"use client";

import QueryClientProviderWrapper from "@/components/global/QueryClientProviderWrapper";
import MainLayout from "@/components/layout/MainLayout";
import RenderSteps from "@/components/page_specific/onboarding/RenderSteps";
import Image from "next/image";
import ErrorArray from "@/components/common/ErrorArray";
import { cn, getStepDetails } from "@/lib/utils";
import TextLogo from "@/components/global/TextLogo";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import { redirect, RedirectType, usePathname } from "next/navigation";
import useOnboardingStore from "@/store/OnboardingStore";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // checks if the path is for ojt or employer
  const path = usePathname();
  const type = path.includes("/onboarding/ojt") ? "ojt" : "employer";

  const session = useSession();
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const errors = useOnboardingStore((state) => state.error);

  const [currentStepDetails, setCurrentStepDetails] = useState(
    getStepDetails(currentStep)
  );

  // update current step details when currentStep changes
  useEffect(() => {
    setCurrentStepDetails(getStepDetails(currentStep, type));
  }, [currentStep, type]);

  if (session.status === "loading") {
    return (
      <MainLayout className="items-center">
        <LoadingGeneric />
      </MainLayout>
    );
  }

  // if the user status_id is active, redirect to profile
  if (session.data?.user.status_id === 1) {
    redirect("/profile", RedirectType.replace);
  }

  // redirect the user to signup if no session exists
  if (!session.data || !session.data.user) {
    redirect("/signup", RedirectType.replace);
  }

  return (
    <QueryClientProviderWrapper>
      <MainLayout className="items-center">
        <div className="flex w-full border rounded-md shadow-md min-h-[600px]">
          <div
            className={cn(
              "w-1/3 shrink-0 rounded-l-md",
              type === "ojt"
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
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-4xl text-skillmatch-dark">
                    {currentStepDetails?.title}
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
