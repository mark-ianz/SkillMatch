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
  }  return (
    <AnimatedTabsRoot
      onValueChange={handleTabChange}
      defaultValue={type}
      className="w-full"
    >
      <AnimatedTabsContent
        value="applicant"
        className="border-r border-y rounded-r-md p-4 space-y-4"
      >
        <TabList />
        {authError && <ErrorAlert error={authError} />}
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignupRoute ? "signup-applicant" : "signin-applicant"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isSignupRoute && <SignupForm mode="applicant" />}
            {isSigninRoute && <SigninForm mode="applicant" />}
          </motion.div>
        </AnimatePresence>
      </AnimatedTabsContent>

      <AnimatedTabsContent
        value="company"
        className="border-r border-y rounded-r-md p-4 space-y-4"
      >
        <TabList />
        {authError && <ErrorAlert error={authError} />}
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignupRoute ? "signup-company" : "signin-company"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isSignupRoute && <SignupForm mode="company" />}
            {isSigninRoute && <SigninForm mode="company" />}
          </motion.div>
        </AnimatePresence>
      </AnimatedTabsContent>
    </AnimatedTabsRoot>
  );
}

function TabList() {
  return (
    <AnimatedTabsList className="grid w-full grid-cols-2">
      <AnimatedTabsTrigger className="cursor-pointer" value="applicant">
        Applicant
      </AnimatedTabsTrigger>
      <AnimatedTabsTrigger className="cursor-pointer" value="company">
        Company
      </AnimatedTabsTrigger>
    </AnimatedTabsList>
  );
}
