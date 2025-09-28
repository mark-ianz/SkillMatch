"use client";

import MainLayout from "@/app/_components/global/MainLayout";
import React from "react";
import SignInWithGoogleButton from "@/app/_components/common/button/SignInWithGoogleButton";

export default function SignInPage() {
  return (
    <MainLayout>
      <div>
        <h1>Sign In</h1>
        <SignInWithGoogleButton />
      </div>
    </MainLayout>
  );
}
