import React from "react";
import LogoSkillMatch from "@/components/global/LogoSkillMatch";
import Link from "next/link";
import OauthButton from "@/components/common/button/OauthButton";
import MainLayout from "@/components/layout/MainLayout";

export default function Signup() {
  return (
    <MainLayout className="items-center justify-center">
      <div className="p-10 gap-10 flex flex-col items-center justify-center border rounded-md h-[500px] min-w-[700px] -mt-20">
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
              text="Sign up with Google as OJT"
              provider="google-ojt"
              callbackUrl="/onboarding/ojt"
              className="w-[400px]"
            />
            <OauthButton
              text="Sign up with Google as Company"
              provider="google-company"
              callbackUrl="/onboarding/company"
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
