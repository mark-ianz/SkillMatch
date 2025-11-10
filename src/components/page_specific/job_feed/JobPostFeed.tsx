"use client";

import { JobPost } from "@/types/job_post.types";
import React, { useEffect } from "react";
import { JobPostPreview } from "./JobPostPreview";
import { useJobPosts } from "@/hooks/query/useJobPosts";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import { useFeedStore } from "@/store/FeedStore";

export default function JobPostFeed({
}) {
  const { data: job_posts, isLoading, error } = useJobPosts();
  const selected_job_post = useFeedStore((state) => state.selected_job_post);
  const setSelectedJobPost = useFeedStore((state) => state.setSelectedJobPost);

  console.log(job_posts)
  //Set initial selected item when data loads
  useEffect(() => {
    if (job_posts && job_posts.length > 0 && selected_job_post === null) {
      setSelectedJobPost(job_posts[0]);
    }
  }, [job_posts, selected_job_post, setSelectedJobPost]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingGeneric />
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
        <div
          key={job.job_post_id}
          onClick={() => setSelectedJobPost(job)}
          className={`cursor-pointer transition-all`}
        >
          <JobPostPreview job={job} />
        </div>
      ))}
    </>
  );
}
