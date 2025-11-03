"use client";

import Link from "next/link";
import LogoSkillMatch from "@/components/global/LogoSkillMatch";
import OauthButton from "@/components/common/button/OauthButton";
import { cn } from "@/lib/utils";

interface SignupFormProps {
  mode: "ojt" | "company";
}

export function SignupForm({ mode }: SignupFormProps) {
  const isOJT = mode === "ojt";

  const headingText = isOJT
    ? "Join SkillMatch as OJT"
    : "Join SkillMatch as Company";

  const subtitle = isOJT ? (
    <>
      Your career journey starts here.
      <br /> Join a community of learners and professionals.
    </>
  ) : (
    <>
      Start building your team. <br /> Connect with top talent and grow
      together.
      <br />
    </>
  );

  const buttonText = isOJT
    ? "Sign up with Google as OJT"
    : "Sign up with Google as Company";

  const emailHint = isOJT
    ? "Continue with your Quezon City University email address."
    : "Continue with your company email address.";

  return (
    <div className="rounded-lg p-10 flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col gap-10 justify-center items-center w-full">
        {/* Logo and subtitle */}
        <div className="flex flex-col items-center justify-center">
          <LogoSkillMatch className="w-[200px] h-[100px]" />

          <div className="flex flex-col items-center justify-center gap-3">
            {/* <h1 className="text-2xl  text-skillmatch-dark text-center">
              {headingText}
            </h1> */}
            <p className="text-sm text-skillmatch-muted-dark text-center max-w-xs">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Horizontal */}
        <div className="w-full border-t border-skillmatch-light-muted-dark max-w-lg" />

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

        <div className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link
            href={`/signin?type=${isOJT ? "ojt" : "company"}`}
            className={cn(
              "hover:underline font-medium text-skillmatch-primary-green",
              !isOJT && "text-skillmatch-primary-blue"
            )}
          >
            Sign in
          </Link>
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
