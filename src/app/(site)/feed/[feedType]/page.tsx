"use client";

import { useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { FeedType } from "@/types/job_feed.types";
import { SidebarProfile } from "@/components/page_specific/job_feed/SidebarProfile";
import { JobFeedFilter } from "@/components/page_specific/job_feed/JobFeedFilter";
import MainLayout from "@/components/layout/MainLayout";
import Feed from "@/components/page_specific/job_feed/Feed";
import FeedFullInfo from "@/components/page_specific/job_feed/FeedFullInfo";
import { useFeedStore } from "@/store/FeedStore";

export default function FeedPage({
  params,
}: {
  params: Promise<{ feedType: FeedType }>;
}) {
  const searchParams = useSearchParams();
  const feedType = use(params).feedType;
  const setFeedType = useFeedStore((state) => state.setFeedType);

  useEffect(() => {
    // Sync URL feedType with store
    setFeedType(feedType);
    // TODO: Implement actual feed filtering based on feedType and filters
    console.log("Feed type:", feedType);
    console.log("Search params:", Object.fromEntries(searchParams));
  }, [feedType, searchParams, setFeedType]);

  return (
    <MainLayout className="items-center pb-20" wrapperClassName="py-4">
      <div className="flex gap-6 w-full mt-4">
        {/* Left Sidebar */}
        <div className="flex-2 sticky space-y-6 h-fit">
          <SidebarProfile />
          <JobFeedFilter className="sticky top-28" feedType={feedType} />
        </div>

        <Feed />
        <FeedFullInfo />
      </div>
    </MainLayout>
  );
}
