"use client";

import LoadingGeneric from "@/components/global/LoadingGeneric";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SigninForm } from "@/components/auth/SigninForm";

export default function Signin() {
  // default type if exists in query params
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");

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

  function handleTabChange(value: string): void {
    // change the search params to reflect the current tab
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", value);
    router.push(`/signin?${params.toString()}`);
  }

  return null;

  return (
    <Tabs
      onValueChange={handleTabChange}
      defaultValue={type || "ojt"}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 mb-2">
        <TabsTrigger className="cursor-pointer" value="ojt">
          OJT
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="company">
          Company
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ojt">
        <SigninForm mode="ojt" />
      </TabsContent>

      <TabsContent value="company">
        <SigninForm mode="company" />
      </TabsContent>
    </Tabs>
  );
}
