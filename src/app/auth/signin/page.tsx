"use client";

import MainLayout from "@/app/_components/global/MainLayout";
import React from "react";
import SignInWithGoogleButton from "@/app/_components/common/button/SignInWithGoogleButton";
import { useParams, useSearchParams } from "next/navigation";
import HeaderText from "@/app/_components/global/HeaderText";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const isError = searchParams.get("error") === "EmailNotAllowed";

  return (
    <MainLayout>
      <div>
        {isError && (
          <div className="bg-red-200 text-red-800 p-4 rounded mb-4">
            Your email is not allowed. Please use your QCU email to sign in.
          </div>
        )}
        <h1>Sign In</h1>
        <SignInWithGoogleButton />
      </div>
    </MainLayout>
  );
}
