import React from "react";
import { JobFeedHeader } from "./JobFeedHeader";
import JobPostFeed from "./JobPostFeed";
import CompanyFeed from "../feed/company/CompanyFeed";
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
