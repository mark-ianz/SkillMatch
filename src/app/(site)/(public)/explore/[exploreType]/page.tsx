"use client";

import { useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { ExploreType } from "@/types/job_explore.types";
import { JobExploreFilter } from "@/components/page_specific/explore/job-posts/JobExploreFilter";
import MainLayout from "@/components/layout/MainLayout";
import Feed from "@/components/page_specific/explore/shared/Explore";
import FeedFullInfo from "@/components/page_specific/explore/shared/ExploreFullInfo";
import SidebarProfile from "@/components/page_specific/sidebar/SidebarProfile";
import { SessionProvider } from "next-auth/react";
import { useExploreStore } from "@/store/ExploreStore";

export default function FeedPage({
  params,
}: {
  params: Promise<{ exploreType: ExploreType }>;
}) {
  const searchParams = useSearchParams();
  const exploreType = use(params).exploreType;
  const setFeedType = useExploreStore((state) => state.setFeedType);

  useEffect(() => {
    // Sync URL exploreType with store
    setFeedType(exploreType);
    // TODO: Implement actual feed filtering based on exploreType and filters
    console.log("Feed type:", exploreType);
    console.log("Search params:", Object.fromEntries(searchParams));
  }, [exploreType, searchParams, setFeedType]);

  return (
    <MainLayout className="items-center pb-20" wrapperClassName="py-4">
      <div className="flex gap-6 w-full mt-4">
        {/* Left Sidebar */}
        <div className="flex-2 sticky space-y-6 h-fit">
          <SessionProvider>
            <SidebarProfile />
          </SessionProvider>
          <JobExploreFilter className="sticky top-28" exploreType={exploreType} />
        </div>

        <Feed />
        <FeedFullInfo />
      </div>
    </MainLayout>
  );
}
