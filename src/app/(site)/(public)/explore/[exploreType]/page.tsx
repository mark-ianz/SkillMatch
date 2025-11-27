"use client";

import { useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { ExploreType } from "@/types/job_explore.types";
import { JobExploreFilter } from "@/components/page_specific/explore/job-posts/JobExploreFilter";
import MainLayout from "@/components/layout/MainLayout";
import Explore from "@/components/page_specific/explore/shared/Explore";
import ExploreFullInfo from "@/components/page_specific/explore/shared/ExploreFullInfo";
import SidebarProfile from "@/components/page_specific/sidebar/SidebarProfile";
import { useExploreStore } from "@/store/ExploreStore";

export default function ExplorePage({
  params,
}: {
  params: Promise<{ exploreType: ExploreType }>;
}) {
  const searchParams = useSearchParams();
  const exploreType = use(params).exploreType;
  const setExploreType = useExploreStore((state) => state.setExploreType);

  useEffect(() => {
    // Sync URL exploreType with store
    setExploreType(exploreType);
    // TODO: Implement actual Explore filtering based on exploreType and filters
    console.log("Explore type:", exploreType);
    console.log("Search params:", Object.fromEntries(searchParams));
  }, [exploreType, searchParams, setExploreType]);

  return (
    <MainLayout className="items-center pb-20" wrapperClassName="py-4">
      <div className="flex gap-6 mt-4 container">
        {/* Left Sidebar */}
        <div className="flex-2 sticky space-y-6 h-fit">
          <SidebarProfile />
          <JobExploreFilter
            className="sticky top-28"
            exploreType={exploreType}
          />
        </div>

        <Explore />
        <ExploreFullInfo />
      </div>
    </MainLayout>
  );
}
