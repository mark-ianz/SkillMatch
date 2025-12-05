"use client";

import AuthTabs from "@/components/auth/AuthTabs";
import React, { useState } /* , { Suspense } */ from "react";
import signup_general from "@/images/auth/signup_general.jpg";
import signin_general from "@/images/auth/signin_general.jpg";
import { usePathname, useSearchParams } from "next/navigation";
/* import { Skeleton } from "@/components/ui/skeleton"; */
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

export default function LayoutContent() {
  const pathName = usePathname();
  const searchQuery = useSearchParams();

  const isApplicant = searchQuery.get("type") === "applicant";
  const isSignup = pathName.includes("signup");
  const [isExpanded, setIsExpanded] = useState(false);

  const imageSrc = isSignup ? signup_general : signin_general;

  const tagline = isApplicant
    ? "Step Into the Workplace with Confidence and Purpose"
    : "Connecting You to the Next Generation of Professionals";
  const description = isApplicant
    ? "Seize opportunities, gain hands-on experience, and sharpen your skills to grow both personally and professionally."
    : "Discover talented individuals willing to contribute, collaborate, and grow their skills while contributing to success.";

  const benefits = isApplicant
    ? [
        {
          title: "Verified OJT Opportunities",
          description: "Access exclusive internships from QCU-verified partner companies.",
        },
        {
          title: "Streamlined Applications",
          description: "Apply to multiple positions with one click using your profile.",
        },
        {
          title: "Real-time Tracking",
          description: "Monitor your application status and receive instant updates.",
        },
        {
          title: "Skill Development",
          description: "Gain hands-on experience that bridges classroom learning with industry practice.",
        },
        {
          title: "Career Growth",
          description: "Build your professional network and open doors to future opportunities.",
        },
      ]
    : [
        {
          title: "Access to QCU Talent Pool",
          description: "Connect with pre-screened students from diverse programs.",
        },
        {
          title: "Efficient Hiring Process",
          description: "Streamlined application management and candidate screening.",
        },
        {
          title: "Verified Candidates",
          description: "All applicants are verified QCU students with validated credentials.",
        },
        {
          title: "Direct Communication",
          description: "Built-in messaging and scheduling tools for seamless coordination.",
        },
        {
          title: "Cost-effective Solution",
          description: "Free platform to post opportunities and find qualified interns.",
        },
      ];

  return (
    <div className="flex">
      <div
        className="relative flex items-start w-1/2 overflow-hidden bg-cover bg-center justify-center pt-20"
        style={{ backgroundImage: `url(${imageSrc.src})` }}
      >
        {/* subtle dim overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* gradient overlay from top to middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 via-50% to-transparent" />

        {/* gradient overlay from bottom to middle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`gradient-${isApplicant}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "absolute inset-0 bg-gradient-to-t to-transparent",
              isApplicant
                ? "via-20% from-skillmatch-primary-green/30 via-skillmatch-primary-green/20"
                : "via-10% from-skillmatch-primary-blue/50 via-skillmatch-primary-blue/40"
            )}
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${isApplicant}-${isSignup}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative text-skillmatch-light z-20 max-w-md"
          >
            <p className="text-3xl font-thin">{tagline}</p>
            <p className="mt-2 text-sm">{description}</p>

            {/* Benefits Accordion */}
            <motion.div
              className="mt-8 overflow-hidden"
              initial={false}
            >
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex gap-2 cursor-pointer"
              >
                <span className="text-sm font-medium">
                  See what&apos;s included
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 space-y-4 mt-4">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-3"
                        >
                          <div className="mt-0.5">
                            <Check className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {benefit.title}
                            </p>
                            <p className="text-xs text-white/70 mt-0.5">
                              {benefit.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full md:w-1/2 min-h-dvh flex flex-col">
        <AuthTabs />
      </div>
    </div>
  );
}

/* export default function Layout() {
  return (
    <Suspense
      fallback={
        <MainLayout className="items-center justify-center -mt-10">
          <div className="container min-w-7xl max-w-7xl flex">
            <div className="relative flex items-end w-1/2 rounded-l-md overflow-hidden bg-muted justify-center pb-14 h-[600px]">
              <div className="relative z-20 max-w-md text-center space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-4/5 mx-auto" />
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-background rounded-r-md p-8">
              <div className="space-y-6">
                <Skeleton className="h-10 w-48" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </MainLayout>
      }
    >
      <LayoutContent />
    </Suspense>
  );
} */
