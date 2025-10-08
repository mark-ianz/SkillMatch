"use client";

import InputWithLabel from "@/app/_components/common/input/InputWithLabel";
import LoadingGeneric from "@/app/_components/global/LoadingGeneric";
import MainLayout from "@/app/_components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";
import React from "react";
import RenderSteps from "../signup/(steps)/RenderSteps";
import { useGetOnboarding } from "@/app/hooks/query/useUser";

export default function Onboarding() {
  const session = useSession();

  const { data: onboardingData } = useGetOnboarding(9);

  console.log(onboardingData);
  console.log(session);

  if (session.status === "loading") {
    return (
      <MainLayout className="items-center">
        <LoadingGeneric />
      </MainLayout>
    );
  }

  // redirect the user to signup if no session exists
  if (!session.data) {
    redirect("/auth/signup", RedirectType.replace);
  }

  return (
    <div className="flex w-full border rounded-md shadow-md">
      <div className="w-1/3 bg-skillmatch-primary-green rounded-l-md">
        <RenderSteps />
      </div>
      <div className="grow p-10">
        <div className="flex">
          <InputWithLabel
            label="First Name"
            id="first-name"
            type="text"
            placeholder="Enter your first name"
          />
          <InputWithLabel
            label="Middle Name"
            id="middle-name"
            type="text"
            placeholder="Enter your middle name"
          />
          <InputWithLabel
            label="Last Name"
            id="last-name"
            type="text"
            placeholder="Enter your last name"
          />
        </div>
        <InputWithLabel
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
        <Button>Next</Button>
      </div>
    </div>
  );
}
