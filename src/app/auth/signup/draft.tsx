"use client";

import MainLayout from "@/app/_components/global/MainLayout";
import React from "react";
import { useSearchParams } from "next/navigation";
import LogoSkillMatch from "@/app/_components/global/LogoSkillMatch";
import OauthButton from "@/app/_components/common/button/OauthButton";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const isError = searchParams.get("error") === "EmailNotAllowed";

  return (
    <MainLayout className="h-[calc(100dvh-80px)] flex flex-col justify-center">
      <div className="border rounded-md flex h-[500px] -mt-20">
        <div id="steps" className="border-r w-1/3 p-10">
          <p>Step </p>
        </div>
        <div className="p-10 flex flex-col items-center justify-center grow">
          {isError && (
            <div className="bg-red-200 text-red-800 p-4 rounded mb-4">
              Your email is not allowed. Please use your QCU email to sign in.
            </div>
          )}
          <div className="w-full flex flex-col items-center justify-center gap-10">
            <div>
              <LogoSkillMatch />
              <p className="text-xs italic text-muted-foreground">
                &quot;Unlock your full potential with SkillMatch&quot;
              </p>
            </div>
            <OauthButton provider="google" callbackUrl="/profile" className="w-[400px]"/>
            <p className="text-xs text-muted-foreground">
              By registering, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
