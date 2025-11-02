"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoSkillMatch from "@/components/global/LogoSkillMatch";
import OauthButton from "@/components/common/button/OauthButton";

interface SignupFormProps {
  mode: "ojt" | "company";
}

export function SignupForm({ mode }: SignupFormProps) {
  const isOJT = mode === "ojt";

  const subtitle = isOJT
    ? "Your career journey starts here. Join a community of learners and professionals."
    : "Build your team. Connect with top talent and grow together.";

  const buttonText = isOJT
    ? "Sign up with Google as OJT"
    : "Sign up with Google as Company";

  const emailHint = isOJT
    ? "Continue with your Quezon City University email address."
    : "Continue with your company email address.";

  return (
    <div className="border rounded-lg p-10 flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col gap-10 justify-center items-center w-full">
        {/* Logo and subtitle */}
        <div className="flex flex-col items-center justify-center gap-4">
          <LogoSkillMatch className="w-[200px] h-[100px]" />

          <p className="text-sm text-muted-foreground text-center max-w-xs">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <OauthButton
            variant={isOJT ? "default" : "default_employer"}
            text={buttonText}
            provider={isOJT ? "google-ojt-signup" : "google-company-signup"}
            callbackUrl={isOJT ? "/onboarding/ojt" : "/onboarding/company"}
            className="w-[400px]"
          />
          <p className="text-xs text-muted-foreground text-center">
            {emailHint}
          </p>
        </div>

        {/* Legal links */}
        <p className="text-xs text-muted-foreground text-center">
          By signing up, you agree to our{" "}
          <Link
            href="/legal/terms"
            className="text-foreground hover:underline font-medium"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy"
            className="text-foreground hover:underline font-medium"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
