"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";;

export default function OauthButton({
  className,
  callbackUrl,
  provider,
  text,
}: {
  callbackUrl?: string;
  className?: string;
  provider: "google-ojt" | "google-company" | "linkedIn";
  text: string;
}) {
  const source =
    provider === "google-ojt"
      ? "/logo/GoogleLogo.png"
      : provider === "google-company"
      ? "/logo/GoogleLogo.png"
      : "/logo/LinkedInLogo.png";

  return (
    <Button
      onClick={async () => {
        const result = await signIn(provider, { callbackUrl });
        console.log(result);
      }}
      className={cn(
        "bg-skillmatch-primary-light text-skillmatch-muted-dark border hover:bg-skillmatch-muted-light",
        className
      )}
    >
      <Image src={source} alt={`${provider} Logo`} width={16} height={16} />
      {text}
    </Button>
  );
}
