"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { useJobPost, useJobPostSuggestions } from "@/hooks/query/useJobPosts";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import MainLayout from "@/components/layout/MainLayout";
import { JobPostPreview } from "@/components/page_specific/explore/job-posts/JobPostPreview";
import { JobPostFullInfo } from "@/components/page_specific/job_post/JobPostFullInfo";
import Link from "next/link";

export default function JobPostPage() {
  const searchParams = useSearchParams();
  const job_post_id = searchParams.get("id");

  const {
    data: jobPost,
    isLoading: jobLoading,
    error: jobError,
  } = useJobPost(job_post_id || "");

  const {
    data: suggestions,
    isLoading: suggestionsLoading,
  } = useJobPostSuggestions(job_post_id || "");

  if (jobLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center">
          <LoadingGeneric />
        </div>
      </MainLayout>
    );
  }

  if (jobError || !jobPost) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center">
          <p className="text-destructive">
            Failed to load job post. Please try again later.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout className="items-center">
      <div className="gap-10 flex flex-col items-center w-full">
        {/* Job Post Full Info */}
        <JobPostFullInfo job={jobPost} className="w-full max-w-5xl" />

        {/* Job Suggestions Section */}
        <div className="space-y-6 w-full max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Recommended Jobs For You
            </h2>
            {suggestions && suggestions.length > 0 && (
              <Badge
                variant="secondary"
                className="text-sm font-medium px-4 py-2"
              >
                {suggestions.length} Suggestion{suggestions.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          {suggestionsLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingGeneric />
            </div>
          ) : suggestions && suggestions.length > 0 ? (
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 gap-4 pr-4">
                {suggestions.map((job) => (
                  <Link
                    key={job.job_post_id}
                    href={"/view/job-post?id=" + job.job_post_id}
                  >
                    <JobPostPreview job={job} />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No similar job opportunities found.
              </p>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
