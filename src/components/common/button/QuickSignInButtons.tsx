"use client";

import React from "react";
import { signIn } from "next-auth/react";

export default function QuickSignInButtons() {
  return (
    <div className="flex flex-col gap-2">
      <button
        className="px-4 py-2 rounded bg-gray-200"
        onClick={() => signIn("google-applicant-signin", { callbackUrl: "/onboarding/applicant" })}
      >
        Sign in as Applicant
      </button>
      <button
        className="px-4 py-2 rounded bg-gray-200"
        onClick={() => signIn("google-company-signin", { callbackUrl: "/onboarding/company" })}
      >
        Sign in as Company
      </button>
    </div>
  );
}
