"use client";

import React from "react";
import { JobExploreHeader } from "../job-posts/JobExploreHeader";
import CompanyExplore from "../company/CompanyExplore";
import { useExploreStore } from "@/store/ExploreStore";
import JobPostExplore from "../job-posts/JobPostExplore";

export default function Explore({}) {
  const exploreType = useExploreStore((state) => state.exploreType);

  return (
    <div className="flex-3 flex flex-col space-y-4">
      <JobExploreHeader />

      {/* Job List - Scrollable */}
      <div className="overflow-y-hidden space-y-3">
        {exploreType === "job-posts" ? <JobPostExplore /> : <CompanyExplore />}
      </div>
    </div>
  );
}
