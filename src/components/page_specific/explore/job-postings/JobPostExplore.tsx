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

  console.log("JobPostFeed - User Info:", { user_id, role_name });
  console.log("JobPostFeed - Job Posts:", job_posts);

  // Set initial selected item when data loads
  useEffect(() => {
    if (job_posts && job_posts.length > 0 && selected_job_post === null) {
      console.log("Setting initial job post:", job_posts[0].job_title);
      setSelectedJobPost(job_posts[0]);
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

  if (!job_posts && !isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-muted">No job posts available</p>
      </div>
    );
  }

  return (
    <>
      {job_posts!.map((job: JobPost) => (
        <div key={job.job_post_id} onClick={() => setSelectedJobPost(job)}>
          <JobPostPreview
            job={job}
            isSelected={selected_job_post?.job_post_id === job.job_post_id}
          />
        </div>
      ))}
    </>
  );
}
