import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { JobPostPreview } from "@/components/page_specific/explore/job-posts/JobPostPreview";
import Link from "next/link";
import { CompanyProfile } from "@/components/page_specific/explore/company/CompanyProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
import CompanyServices from "@/services/company.services";

export default async function CompanyProfilePage({params} : { params: Promise<{ company_id: string }> }) {
  const { company_id } = await params;
  const { company_profile, job_posted } = await CompanyServices.getCompanyWithJobs(company_id);

  if (!company_profile) {
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


  return (
    <MainLayout className="items-center">
      <div className="gap-10 flex flex-col items-centerw-full">
        {/* Company Profile Card */}
        <CompanyProfile className="p-10 w-5xl" company={company_profile} />

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
              {job_posted.length} Opening{job_posted.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {job_posted.length > 0 ? (
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 gap-4 pr-4">
                {job_posted.map((job) => (
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
