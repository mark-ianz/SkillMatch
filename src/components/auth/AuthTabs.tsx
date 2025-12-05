"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AnimatedTabsRoot,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsContent,
} from "@/components/ui/animated-tabs";
import { SigninForm } from "@/components/auth/SigninForm";
import { SignupForm } from "@/components/auth/SignupForm";
import ErrorAlert from "@/components/common/ErrorAlert";
import { getAuthError, getAuthStatus, AuthError } from "@/lib/auth-errors";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AuthTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "applicant";
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
    <AnimatedTabsRoot
      onValueChange={handleTabChange}
      defaultValue={type}
      className="w-full h-full"
    >
      <TabContentLayout value="applicant" authError={authError}>
        <AnimatedFormContainer>
          {isSignupRoute && <SignupForm mode="applicant" />}
          {isSigninRoute && <SigninForm mode="applicant" />}
        </AnimatedFormContainer>
      </TabContentLayout>

      <TabContentLayout value="company" authError={authError}>
        <AnimatedFormContainer>
          {isSignupRoute && <SignupForm mode="company" />}
          {isSigninRoute && <SigninForm mode="company" />}
        </AnimatedFormContainer>
      </TabContentLayout>
    </AnimatedTabsRoot>
  );
}

function TabList({ isApplicant }: { isApplicant: boolean }) {
  return (
    <AnimatedTabsList className="grid w-full grid-cols-2">
      <AnimatedTabsTrigger
        className={cn("cursor-pointer", isApplicant ? "text-skillmatch-light" : "text-skillmatch-dark")}
        activeBgColor="bg-skillmatch-primary-green"
        value="applicant"
      >
        Applicant
      </AnimatedTabsTrigger>
      <AnimatedTabsTrigger
        className={cn("cursor-pointer", !isApplicant ? "text-skillmatch-light" : "text-skillmatch-dark")}
        activeBgColor="bg-skillmatch-primary-blue"
        value="company"
      >
        Company
      </AnimatedTabsTrigger>
    </AnimatedTabsList>
  );
}

function TabContentLayout({
  children,
  value,
  authError,
}: {
  children: React.ReactNode;
  value: "applicant" | "company";
  authError: AuthError | null;
}) {
  return (
    <AnimatedTabsContent
      value={value}
      className="p-4 space-y-4 flex flex-col h-full"
    >
      <TabList isApplicant={value === "applicant"} />
      {authError && <ErrorAlert error={authError} />}

      {children}
    </AnimatedTabsContent>
  );
}

function AnimatedFormContainer({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="flex items-center h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
