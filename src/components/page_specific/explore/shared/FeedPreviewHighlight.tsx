import { cn } from "@/lib/utils";
import { useFeedStore } from "@/store/FeedStore";
import { ExploreType } from "@/types/job_feed.types";
import React from "react";

export default function FeedPreviewHighlight({
  className,
  children,
  id,
  exploreType,
}: {
  className?: string;
  children: React.ReactNode;
  id: string;
  exploreType: ExploreType;
}) {
  const selected_job_post = useFeedStore((state) => state.selected_job_post);
  const selected_company = useFeedStore((state) => state.selected_company);

  const isJobFeed = exploreType === "job-posts";

  let isSelected;

  if (isJobFeed) {
    isSelected = selected_job_post?.job_post_id === id;
  } else {
    isSelected = selected_company?.company_id === id;
  }

  return (
    <div
      className={cn(
        className,
        isSelected && "border-skillmatch-primary-green hover:border-skillmatch-primary-green"
      )}
    >
      {children}
    </div>
  );
}
