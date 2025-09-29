import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function SignInWithGoogleButton() {
  return (
    <Button
      onClick={async () => {
        const result = await signIn("google", { callbackUrl: "/profile"});
        console.log(result)
      }}
      className="bg-skillmatch-primary-light text-skillmatch-dark border hover:bg-skillmatch-muted-light"
    >
      <Image
        src={"/logo/GoogleLogo.png"}
        alt="Google Logo"
        width={16}
        height={16}
      />
      Sign in with Google
    </Button>
  );
}
