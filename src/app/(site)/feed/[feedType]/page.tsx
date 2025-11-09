"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { JobPost } from "@/types/job_post.types";
import { FeedType } from "@/types/job_feed.types";
import { SidebarProfile } from "@/components/page_specific/job_feed/SidebarProfile";
import { JobFeedFilter } from "@/components/page_specific/job_feed/JobFeedFilter";
import { JobFeedHeader } from "@/components/page_specific/job_feed/JobFeedHeader";
import { JobPostPreview } from "@/components/page_specific/job_feed/JobPostPreview";
import { JobPostFullInfo } from "@/components/page_specific/job_post/JobPostFullInfo";
import MainLayout from "@/components/layout/MainLayout";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import { useJobPosts } from "@/hooks/query/useJobPosts";

export default function FeedPage({
  params,
}: {
  params: Promise<{ feedType: FeedType }>;
}) {
  const { data: jobPosts, isLoading, error } = useJobPosts();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const feedType = use(params).feedType;

  // Set initial selected job when data loads
  useEffect(() => {
    if (jobPosts && jobPosts.length > 0 && selectedJobId === null) {
      setSelectedJobId(jobPosts[0].job_post_id);
    }
  }, [jobPosts, selectedJobId]);

  useEffect(() => {
    // TODO: Implement actual feed filtering based on feedType and filters
    console.log("Feed type:", feedType);
    console.log("Search params:", Object.fromEntries(searchParams));
  }, [feedType, searchParams]);

  const selectedJob = jobPosts?.find(
    (job: JobPost) => job.job_post_id === selectedJobId
  );

  if (isLoading) {
    return (
      <MainLayout className="items-center pb-20" wrapperClassName="py-4">
        <div className="flex items-center justify-center h-screen">
          <LoadingGeneric />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout className="items-center pb-20" wrapperClassName="py-4">
        <div className="flex items-center justify-center h-screen">
          <p className="text-destructive">Failed to load job posts. Please try again later.</p>
        </div>
      </MainLayout>
    );
  }

  

  return (
    <MainLayout className="items-center pb-20" wrapperClassName="py-4">
      {/* <div className="min-h-screen bg-background"> */}
      <div className="flex gap-6 w-full mt-4">
        {/* Left Sidebar */}
        <div className="flex-2 sticky space-y-6 h-fit">
          <SidebarProfile />
          <JobFeedFilter className="sticky top-28" feedType={feedType} />
        </div>

        {/* Middle Feed */}
        <div className="flex-3 flex flex-col space-y-4">
          <JobFeedHeader feedType={feedType} />

          {/* Job List - Scrollable */}
          <div
            className="overflow-y-auto space-y-3"
            /*  style={{
              maxHeight: sidebarHeight ? `${sidebarHeight}px` : undefined,
            }} */
          >
            {jobPosts.map((job: JobPost) => (
              <div
                key={job.job_post_id}
                onClick={() => setSelectedJobId(job.job_post_id)}
                className={`cursor-pointer transition-all`}
              >
                <JobPostPreview
                  className={
                    selectedJobId === job.job_post_id
                      ? "border-skillmatch-primary-green hover:border-skillmatch-primary-green"
                      : ""
                  }
                  data={job as JobPost}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="flex-4 sticky top-28 bottom-4 pb-20 h-fit">
          {selectedJob && (
            <div className="max-h-[calc(100vh-9rem)] overflow-y-auto border pb-4 rounded-lg">
              <JobPostFullInfo className="border-0 shadow-none" data={selectedJob as JobPost} />
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </MainLayout>
  );
}
