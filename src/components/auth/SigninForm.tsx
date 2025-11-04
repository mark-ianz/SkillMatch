"use client";

import Link from "next/link";
import LogoSkillMatch from "@/components/global/LogoSkillMatch";
import { cn } from "@/lib/utils";
import OauthButton from "@/components/common/button/OauthButton";

interface SigninFormProps {
  mode: "ojt" | "company";
}

export function SigninForm({ mode }: SigninFormProps) {
  const isOJT = mode === "ojt";

  const tagline = isOJT
    ? "Your next opportunity awaits. Sign in to explore internships and grow your skills."
    : "Connect with top talent, manage your team, and scale your business.";

  const buttonText = isOJT
    ? "Sign in with Google as OJT"
    : "Sign in with Google as Company";

  const emailHint = isOJT
    ? "Sign in with your Quezon City University email address."
    : "Sign in with your company email address.";

  return (
    <div className="rounded-lg p-10 flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-8 justify-center items-center w-full">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center">
          <LogoSkillMatch className="w-[200px] h-[100px]" />

          {/* Enhanced heading and tagline */}
          <div className="flex flex-col items-center justify-center gap-3">
            {/* <h1 className="text-2xl  text-skillmatch-dark text-center">
              {headingText}
            </h1> */}
            <p className="text-sm text-skillmatch-muted-dark text-center max-w-xs">
              {tagline}
            </p>
          </div>
        </div>

        {/* Horizontal */}
        <div className="w-full border-t border-skillmatch-light-muted-dark max-w-lg" />

        {/* CTA Button */}
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <OauthButton
            variant={isOJT ? "default" : "default_employer"}
            text={buttonText}
            provider={isOJT ? "google-ojt" : "google-company"}
            callbackUrl={isOJT ? "/onboarding/ojt" : "/onboarding/company"}
            className="w-[400px]"
          />
          <p className="text-xs text-muted-foreground text-center">
            {emailHint}
          </p>
        </div>

        {/* Sign up link */}
        <div className="text-sm text-muted-foreground text-center">
          New here?{" "}
          <Link
            href={`/signup?type=${isOJT ? "ojt" : "company"}`}
            className={cn(
              "hover:underline font-medium text-skillmatch-primary-green",
              !isOJT && "text-skillmatch-primary-blue"
            )}
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
