"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

export default function OauthButton({
  variant,
  className,
  callbackUrl,
  provider,
  text,
}: {
  variant?: "default" | "default_employer";
  callbackUrl?: string;
  className?: string;
  provider:
    | "google-applicant-signin"
    | "google-company-signin"
    | "google-company-signup"
    | "google-applicant-signup"
    | "linkedIn";
  text: string;
}) {
  const source = provider.includes("google")
    ? "/logo/GoogleLogo.png"
    : "/logo/LinkedInLogo.png";
  return (
    <Button
      onClick={async () => {
        const result = await signIn(provider, { callbackUrl });
        console.log(result);
      }}
      className={cn(
        /* "bg-skillmatch-primary-light text-skillmatch-muted-dark border hover:bg-skillmatch-muted-light", */
        className,
      )}
      variant={variant}
    >
      <div className="bg-white p-0.5 rounded-full">
        <Image src={source} alt={`${provider} Logo`} width={16} height={16} />
      </div>
      {text}
    </Button>
  );
}
