"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SigninForm } from "@/components/auth/SigninForm";
import { SignupForm } from "@/components/auth/SignupForm";
import ErrorAlert from "@/components/common/ErrorAlert";
import { getAuthError, getAuthStatus, AuthError } from "@/lib/auth-errors";

export default function AuthTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "ojt";
  const errorParam = searchParams.get("error");
  const statusParam = searchParams.get("status");

  const [authError, setAuthError] = useState<AuthError | null>(null);

  const isSignupRoute = pathname?.includes("/signup");
  const isSigninRoute = pathname?.includes("/signin");

  useEffect(() => {
    // Check for error or status in URL params
    if (errorParam) {
      setAuthError(getAuthError(errorParam));
    } else if (statusParam) {
      setAuthError(getAuthStatus(statusParam));
    } else {
      setAuthError(null);
    }
  }, [errorParam, statusParam]);

  function handleTabChange(value: string) {
    // update query param 'type' and preserve pathname
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", value);
    // Clear error/status params when changing tabs
    params.delete("error");
    params.delete("status");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Tabs
      onValueChange={handleTabChange}
      defaultValue={type}
      className="w-full"
    >
      <TabsContent value="ojt" className="border-r border-y rounded-r-md p-4 space-y-4">
        <TabList />
        {authError && <ErrorAlert error={authError} />}
        {isSignupRoute && <SignupForm mode="ojt" />}
        {isSigninRoute && <SigninForm mode="ojt" />}
      </TabsContent>

      <TabsContent
        value="company"
        className="border-r border-y rounded-r-md p-4 space-y-4"
      >
        <TabList />
        {authError && <ErrorAlert error={authError} />}
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
