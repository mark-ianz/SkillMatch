"use client";

import React from "react";
import { JobPostFullInfo } from "../../job_postings/JobPostFullInfo";
import { useExploreStore } from "@/store/ExploreStore";
import { CompanyProfile } from "../company/CompanyProfile";
import { JobPostFullInfoSkeleton } from "@/components/common/skeleton/JobPostSkeleton";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExploreFullInfo() {
  const exploreType = useExploreStore((state) => state.exploreType);
  const isJobPostsLoading = useExploreStore((state) => state.isJobPostsLoading);
  const isCompaniesLoading = useExploreStore((state) => state.isCompaniesLoading);
  const { status } = useSession();

  const selected_job_post = useExploreStore((state) => state.selected_job_post);
  const selected_company = useExploreStore((state) => state.selected_company);

  // Determine if we should show loading based on exploreType
  const isLoading = exploreType === "job-postings" ? isJobPostsLoading : isCompaniesLoading;

  // Show skeleton while session is loading OR data is loading
  if (status === "loading" || isLoading) {
    return (
      <div className="flex-4 sticky top-24 bottom-4 pb-20 h-fit">
        <div className="max-h-[calc(100vh-9rem)] pb-4">
          <JobPostFullInfoSkeleton />
        </div>
      </div>
    );
  }

  if (!selected_job_post && exploreType === "job-postings") {
    return (
      <div className="flex-4 sticky top-24 bottom-4 pb-20 h-fit">
        <div className="border rounded-lg p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Select a Job Posting
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Click on any job posting from the list to view its full details here.
          </p>
        </div>
      </div>
    );
  }

  if (!selected_company && exploreType === "companies") {
    return (
      <div className="flex-4 sticky top-24 bottom-4 pb-20 h-fit">
        <div className="border rounded-lg p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Select a Company
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Click on any company from the list to view its full profile here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-4 sticky top-24 bottom-4 pb-20 h-fit">
      <AnimatePresence mode="wait">
        <motion.div
          key={exploreType === "job-postings" ? selected_job_post?.job_post_id : selected_company?.company_id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="max-h-[calc(100vh-9rem)] overflow-y-auto border pb-4 rounded-lg"
        >
          {exploreType === "job-postings" && (
            <JobPostFullInfo
              job={selected_job_post!}
              className="border-0 shadow-none"
            />
          )}
          {exploreType === "companies" && (
            <CompanyProfile
              company={selected_company!}
              className="border-0 shadow-none"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
