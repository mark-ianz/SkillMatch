import React from "react";
import { JobPostFullInfo } from "../../job_post/JobPostFullInfo";
import { useFeedStore } from "@/store/FeedStore";
import { CompanyProfile } from "../company/CompanyProfile";

export default function FeedFullInfo() {
  const exploreType = useFeedStore((state) => state.exploreType);

  return (
    <div className="flex-4 sticky top-28 bottom-4 pb-20 h-fit">
      <div className="max-h-[calc(100vh-9rem)] overflow-y-auto border pb-4 rounded-lg">
        {exploreType === "job-posts" && (
          <JobPostFullInfo className="border-0 shadow-none" />
        )}
        {exploreType === "companies" && (
          <CompanyProfile className="border-0 shadow-none" />
        )}
      </div>
    </div>
  );
}
