import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function OauthButton({
  className,
  callbackUrl,
  provider,
}: {
  callbackUrl?: string;
  className?: string;
  provider: "google" | "linkedIn";
}) {
  const source =
    provider === "google" ? "/logo/GoogleLogo.png" : "/logo/LinkedInLogo.png";

  return (
    <Button
      onClick={async () => {
        const result = await signIn(provider, { callbackUrl });
        console.log(result);
      }}
      className={twMerge(
        "bg-skillmatch-primary-light text-skillmatch-muted-dark border hover:bg-skillmatch-muted-light",
        className
      )}
    >
      <Image
        src={source}
        alt={`${provider} Logo`}
        width={16}
        height={16}
      />
      Sign in with {provider === "google" ? "Google" : "LinkedIn"}
    </Button>
  );
}
