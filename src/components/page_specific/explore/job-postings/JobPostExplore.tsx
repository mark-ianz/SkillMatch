"use client";

import { JobPost } from "@/types/job_post.types";
import React, { useEffect } from "react";
import { JobPostPreview } from "./JobPostPreview";
import { useJobPosts } from "@/hooks/query/useJobPosts";
import { useExploreStore } from "@/store/ExploreStore";
import { useSearchParams } from "next/navigation";
import { JobExploreFilters } from "@/types/job_explore.types";
import { JobPostCardSkeleton } from "@/components/common/skeleton/JobPostSkeleton";
import { useSession } from "next-auth/react";
import { getRoleName } from "@/lib/utils";
import { motion } from "framer-motion";

export default function JobPostExplore() {
  const searchParams = useSearchParams();
  const { data: session, status: sessionStatus } = useSession();
  const isSessionLoading = sessionStatus === "loading";
  const user_id = session?.user?.user_id;
  const role_name = getRoleName(session?.user?.role_id);

  // Build filters from URL params
  const filters: JobExploreFilters = {
    courses: searchParams.getAll("course"),
    locations: searchParams.getAll("location"),
    workArrangement: searchParams.getAll("arrangement"),
    industries: searchParams.getAll("industry"),
    jobCategories: searchParams.getAll("jobCategory"),
    search: searchParams.get("search") || undefined,
    isPaid: searchParams.get("paid") === "true" ? true : undefined,
  };

  const {
    data: job_posts,
    isLoading,
    error,
  } = useJobPosts(filters, user_id, role_name, isSessionLoading);
  const selected_job_post = useExploreStore((state) => state.selected_job_post);
  const setSelectedJobPost = useExploreStore(
    (state) => state.setSelectedJobPost
  );
  const setIsJobPostsLoading = useExploreStore(
    (state) => state.setIsJobPostsLoading
  );

  console.log("JobPostFeed - User Info:", { user_id, role_name });
  console.log("JobPostFeed - Job Posts:", job_posts);

  // Update loading state in store
  useEffect(() => {
    setIsJobPostsLoading(isLoading);
  }, [isLoading, setIsJobPostsLoading]);

  // Set initial selected item when data loads
  useEffect(() => {
    if (job_posts && job_posts.length > 0 && selected_job_post === null) {
      console.log("Setting initial job post:", job_posts[0].job_title);
      setSelectedJobPost(job_posts[0]);
    } else if (job_posts && job_posts.length === 0) {
      // Clear selection when no results
      setSelectedJobPost(null);
    }
  }, [job_posts, selected_job_post, setSelectedJobPost]);

  if (isLoading || isSessionLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <JobPostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-destructive">
          Failed to load job posts. Please try again later.
        </p>
      </div>
    );
  }

  if (!job_posts || job_posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
      >
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Job Postings Found
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Try adjusting your filters or search query to find more results.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {job_posts.map((job: JobPost, index) => (
        <motion.div
          key={job.job_post_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => setSelectedJobPost(job)}
        >
          <JobPostPreview
            job={job}
            isSelected={selected_job_post?.job_post_id === job.job_post_id}
          />
        </motion.div>
      ))}
    </>
  );
}
