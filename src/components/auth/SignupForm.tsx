"use client";

import Link from "next/link";
import LogoSkillMatch from "@/components/global/LogoSkillMatch";
import OauthButton from "@/components/common/button/OauthButton";
import { cn } from "@/lib/utils";
import { Shield, Users, Zap, TrendingUp, Building2, GraduationCap } from "lucide-react";

interface SignupFormProps {
  mode: "applicant" | "company";
}

export function SignupForm({ mode }: SignupFormProps) {
  const isApplicant = mode === "applicant";

  const heading = isApplicant
    ? "Start Your Career Journey"
    : "Find Your Next Star Employee";

  const subtitle = isApplicant
    ? "Be part of the growing community of QCU students landing their dream OJT placements — learn, grow, and step confidently into your chosen career."
    : "Connect with highly motivated students ready to bring fresh ideas, skills, and energy to your team. Find the talent that fits your needs and accelerate your projects today.";

  const buttonText = isApplicant
    ? "Continue with Google"
    : "Continue with Google";

  const emailHint = isApplicant
    ? "Use your Quezon City University email address"
    : "Use your company email address";

  const features = isApplicant
    ? [
        {
          icon: Shield,
          title: "Verified Companies",
          description: "All partner companies are QCU-verified",
        },
        {
          icon: Zap,
          title: "Quick Apply",
          description: "One-click applications with saved profiles",
        },
        {
          icon: TrendingUp,
          title: "Track Progress",
          description: "Real-time application status updates",
        },
      ]
    : [
        {
          icon: GraduationCap,
          title: "Top Talent",
          description: "Access pre-screened QCU students",
        },
        {
          icon: Users,
          title: "Easy Management",
          description: "Streamlined applicant tracking system",
        },
        {
          icon: Building2,
          title: "Free Posting",
          description: "Unlimited job postings at no cost",
        },
      ];

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto px-6 py-8 min-h-full">
        {/* Logo */}
        <div className="mb-8 flex justify-center flex-shrink-0">
          <Link href={isApplicant ? "/" : "/company"}>
            <LogoSkillMatch className="w-[140px] h-[70px] lg:w-[180px] lg:h-[90px]" />
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8 text-center flex-shrink-0">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
            {heading}
          </h1>
          <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Google OAuth Button */}
        <div className="w-full space-y-3 mb-8 flex-shrink-0">
          <OauthButton
            variant={isApplicant ? "default" : "default_employer"}
            text={buttonText}
            provider={
              isApplicant ? "google-applicant-signup" : "google-company-signup"
            }
            callbackUrl={
              isApplicant ? "/onboarding/applicant" : "/onboarding/company"
            }
            className="w-full h-12 lg:h-14 text-base lg:text-lg font-medium shadow-sm hover:shadow-md transition-all"
          />
          <p className="text-xs lg:text-sm text-center text-gray-500 px-4">
            {emailHint}
          </p>
        </div>

        {/* Features Grid */}
        <div className="w-full mb-8 flex-shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={cn(
                      "w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mb-3",
                      isApplicant
                        ? "bg-green-100 text-skillmatch-primary-green"
                        : "bg-blue-100 text-skillmatch-primary-blue"
                    )}
                  >
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sign in link */}
        <div className="text-sm lg:text-base text-gray-600 text-center mb-6 flex-shrink-0">
          Already have an account?{" "}
          <Link
            href={`/signin?type=${isApplicant ? "applicant" : "company"}`}
            className={cn(
              "font-semibold hover:underline transition-colors",
              isApplicant
                ? "text-skillmatch-primary-green"
                : "text-skillmatch-primary-blue"
            )}
          >
            Sign in
          </Link>
        </div>

        {/* Legal links */}
        <p className="text-xs lg:text-sm text-center text-gray-500 leading-relaxed px-4 flex-shrink-0">
          By signing up, you agree to our{" "}
          <Link
            href="/terms-of-service"
            className="text-gray-700 hover:underline font-medium"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="text-gray-700 hover:underline font-medium"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
