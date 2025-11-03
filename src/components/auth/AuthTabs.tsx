"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SigninForm } from "@/components/auth/SigninForm";
import { SignupForm } from "@/components/auth/SignupForm";

export default function AuthTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "ojt";

  const isSignupRoute = pathname?.includes("/signup");
  const isSigninRoute = pathname?.includes("/signin");

  function handleTabChange(value: string) {
    // update query param 'type' and preserve pathname
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Tabs
      onValueChange={handleTabChange}
      defaultValue={type}
      className="w-full"
    >
      <TabsContent value="ojt" className="border-r border-y rounded-r-md p-4">
        <TabList />
        {isSignupRoute && <SignupForm mode="ojt" />}
        {isSigninRoute && <SigninForm mode="ojt" />}
      </TabsContent>

      <TabsContent
        value="company"
        className="border-r border-y rounded-r-md p-4"
      >
        <TabList />
        {isSignupRoute && <SignupForm mode="company" />}
        {isSigninRoute && <SigninForm mode="company" />}
      </TabsContent>
    </Tabs>
  );
}

function TabList() {
  return (
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger className="cursor-pointer" value="ojt">
        OJT
      </TabsTrigger>
      <TabsTrigger className="cursor-pointer" value="company">
        Company
      </TabsTrigger>
    </TabsList>
  );
}
