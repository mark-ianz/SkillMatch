"use client";

import MainLayout from "@/app/_components/global/MainLayout";
import React from "react";
import { useSearchParams } from "next/navigation";
import LogoSkillMatch from "@/app/_components/global/LogoSkillMatch";
import Link from "next/link";
import OauthButton from "@/app/_components/common/button/OauthButton";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const isError = searchParams.get("error") === "EmailNotAllowed";

  if (isError) {
    toast("Invalid email address", {
      description: "Please use your Quezon City University email address.",
    });
  }

  return (
    <MainLayout className="h-[calc(100dvh-80px)] flex flex-col items-center justify-center">
      <div className="p-10 gap-10 flex flex-col items-center justify-center border rounded-md h-[500px] w-[700px] -mt-20">
        <Alert variant="destructive" className="bg-destructive/20">
          <AlertCircleIcon />
          <AlertTitle>Invalid email address</AlertTitle>
          <AlertDescription>
            Please use your Quezon City University email address to sign up.
          </AlertDescription>
        </Alert>
        <div className="flex flex-col gap-10 items-center justify-around h-full w-96">
          <div className="flex flex-col items-center justify-center gap-2">
            <LogoSkillMatch className="w-[200px] h-[100px]" />
            <p className="text-sm text-muted-foreground text-center">
              Your career journey starts here. <br />
              Join a community of learners and professionals.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <OauthButton
              provider="google"
              callbackUrl="/profile"
              className="w-[400px]"
            />
            <OauthButton
              provider="linkedIn"
              callbackUrl="/profile"
              className="w-[400px]"
            />
            <p className="text-xs text-muted-foreground">
              Continue with your Quezon City University email address.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link
              className="text-skillmatch-primary-yellow"
              href="/legal/terms"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="text-skillmatch-primary-yellow"
              href="/legal/privacy"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
