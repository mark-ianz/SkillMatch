import React from "react";
import { JobPostFullInfo } from "../../job_post/JobPostFullInfo";
import { useFeedStore } from "@/store/FeedStore";
import { CompanyProfile } from "../company/CompanyProfile";

export default function FeedFullInfo() {
  const exploreType = useFeedStore((state) => state.exploreType);

  const selected_job_post = useFeedStore((state) => state.selected_job_post);
  const selected_company = useFeedStore((state) => state.selected_company);

  if (!selected_job_post && exploreType === "job-posts") {
    return (
      <div className="flex items-center justify-center">
        <p className="text-muted">No job post selected</p>
      </div>
    );
  }

  if (!selected_company && exploreType === "companies") {
    return (
      <div className="flex items-center justify-center">
        <p className="text-muted">No company selected</p>
      </div>
    );
  }

  return (
    <div className="flex-4 sticky top-28 bottom-4 pb-20 h-fit">
      <div className="max-h-[calc(100vh-9rem)] overflow-y-auto border pb-4 rounded-lg">
        {exploreType === "job-posts" && (
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
      </div>
    </div>
  );
}
