"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import LogoSkillMatch from "@/components/global/LogoSkillMatch";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface SigninFormProps {
  mode: "applicant" | "company";
}

export function SigninForm({ mode }: SigninFormProps) {
  const isApplicant = mode === "applicant";

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle password sign in
  const handlePasswordSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn(
        isApplicant ? "applicant-credentials" : "company-credentials",
        {
          email: formData.email,
          password: formData.password,
          redirect: false,
        }
      );

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // Success - redirect to onboarding or dashboard
      window.location.href = isApplicant
        ? "/onboarding/applicant"
        : "/onboarding/company";
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth sign in
  const handleGoogleSignin = () => {
    signIn(isApplicant ? "google-applicant-signin" : "google-company-signin", {
      callbackUrl: isApplicant
        ? "/onboarding/applicant"
        : "/onboarding/company",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <LogoSkillMatch className="w-[140px] h-[70px] lg:w-[180px] lg:h-[90px]" />
      </div>

      {/* Heading */}
      <div className="mb-8 flex items-start flex-col w-full">
        <h1 className="text-xl lg:text-2xl text-skillmatch-muted-dark">
          Sign in to SkillMatch as {isApplicant ? "an applicant" : "a company"}
        </h1>
        <p className="text-skillmatch-muted-dark/60 text-sm lg:text-base">Please enter your credentials to continue</p>
      </div>

      {/* Sign In Form */}
      <form onSubmit={handlePasswordSignin} className="w-full space-y-4">
        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isLoading}
            required
            className="h-11"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
              required
              className="h-11 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link
            target="_blank"
            href="/faqs#forgot-password"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full h-11 text-base font-medium",
            isApplicant
              ? "bg-skillmatch-primary-green hover:bg-skillmatch-primary-green/90"
              : "bg-skillmatch-primary-blue hover:bg-skillmatch-primary-blue/90"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative w-full my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-gray-500">Or Sign in With</span>
        </div>
      </div>

      {/* OAuth Buttons */}
      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleSignin}
        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors mb-6 cursor-pointer"
        aria-label="Sign in with Google"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      </button>

      {/* Sign up link */}
      <div className="text-sm text-gray-600 text-center">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup?type=${isApplicant ? "applicant" : "company"}`}
          className={cn(
            "font-semibold hover:underline",
            isApplicant
              ? "text-skillmatch-primary-green"
              : "text-skillmatch-primary-blue"
          )}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
