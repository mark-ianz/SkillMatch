"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useGetCompanyWithJobs } from "@/hooks/query/useCompanies";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import MainLayout from "@/components/layout/MainLayout";
import { JobPostPreview } from "@/components/page_specific/explore/job-posts/JobPostPreview";
import Link from "next/link";
import { CompanyProfile } from "@/components/page_specific/explore/company/CompanyProfile";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CompanyProfilePage() {
  const company_id = useSearchParams().get("id");

  const { data, isLoading, error } = useGetCompanyWithJobs(company_id || "");

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingGeneric />
      </MainLayout>
    );
  }

  if (error || !data) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center">
          <p className="text-destructive">
            Failed to load company profile. Please try again later.
          </p>
        </div>
      </MainLayout>
    );
  }

  const company = data.company_profile;
  const jobPosts = data.job_posted;

  return (
    <MainLayout className="items-center">
      <div className="gap-10 flex flex-col items-centerw-full">
        {/* Company Profile Card */}
        <CompanyProfile className="p-10 w-5xl" company={company} />

        {/* Job Posts Section */}
        <div className="space-y-6 grow">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Available Positions
            </h2>
            <Badge
              variant="secondary"
              className="text-sm font-medium px-4 py-2"
            >
              {jobPosts.length} Opening{jobPosts.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {jobPosts.length > 0 ? (
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 gap-4 pr-4">
                {jobPosts.map((job) => (
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
                No job openings available at the moment.
              </p>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
