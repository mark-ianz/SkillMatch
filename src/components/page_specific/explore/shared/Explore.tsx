"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { JobExploreHeader } from "../job-posts/JobExploreHeader";
import CompanyExplore from "../company/CompanyExplore";
import { useExploreStore } from "@/store/ExploreStore";
import JobPostExplore from "../job-posts/JobPostExplore";
import { ExploreType } from "@/types/job_explore.types";

export default function Explore({}) {
  const params = useParams();
  const exploreType = useExploreStore((state) => state.exploreType);
  const setExploreType = useExploreStore((state) => state.setExploreType);

  // Sync store with URL parameter
  useEffect(() => {
    const urlExploreType = params.exploreType as ExploreType;
    if (urlExploreType && urlExploreType !== exploreType) {
      setExploreType(urlExploreType);
    }
  }, [params.exploreType, exploreType, setExploreType]);

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
