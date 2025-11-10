import React from "react";
import { JobFeedHeader } from "../job-posts/JobFeedHeader";
import JobPostFeed from "../job-posts/JobPostFeed";
import CompanyFeed from "../company/CompanyFeed";
import { useFeedStore } from "@/store/FeedStore";

export default function Feed({}) {
  const feedType = useFeedStore((state) => state.feedType);

  return (
    <div className="flex-3 flex flex-col space-y-4">
      <JobFeedHeader />

      {/* Job List - Scrollable */}
      <div className="overflow-y-hidden space-y-3">
        {feedType === "job-posts" ? <JobPostFeed /> : <CompanyFeed />}
      </div>
    </div>
  );
}
