"use client";

import LoadingGeneric from "@/components/global/LoadingGeneric";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function Signin() {
  const session = useSession();

  if (session.status === "loading") {
    return <LoadingGeneric full className="w-6 h-6" />;
  }

  if (session.status === "authenticated") {
    // Redirect based on role
    if (session.data.user.role_id === 3) {
      redirect("/onboarding/ojt");
    }

    if (session.data.user.role_id === 4) {
      redirect("/onboarding/company");
    }
  }

  return <div>page</div>;
}
