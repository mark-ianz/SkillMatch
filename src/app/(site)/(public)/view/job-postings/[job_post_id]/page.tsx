import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/components/layout/MainLayout";
import { JobPostPreview } from "@/components/page_specific/explore/job-postings/JobPostPreview";
import { JobPostFullInfo } from "@/components/page_specific/job_postings/JobPostFullInfo";
import Link from "next/link";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { JobPostingServices } from "@/services/job-posting.services";
import { redirect } from "next/navigation";
import { getRoleName } from "@/lib/utils";

interface JobPostPageProps {
  params: Promise<{
    job_post_id?: string;
  }>;
}

export default async function JobPostPage({ params }: JobPostPageProps) {
  const { job_post_id } = await params;

  if (!job_post_id) {
    redirect("/explore");
  }

  // Get server-side session
  const session = await getServerSession(authConfig);
  const user_id = session?.user?.user_id;

  /* if (!session?.user?.role_id) {
    redirect("/signup");
  } */

  const role_name = getRoleName(session?.user?.role_id);

  // Fetch data server-side
  const jobPost = await JobPostingServices.getJobPostById(
    job_post_id,
    user_id,
    role_name
  );

  if (!jobPost) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center">
          <p className="text-destructive">
            Job post not found. Please try again later.
          </p>
        </div>
      </MainLayout>
    );
  }

  const suggestions = await JobPostingServices.getJobPostSuggestions(
    job_post_id,
    user_id,
    role_name
  );

  return (
    <MainLayout className="items-center" wrapperClassName="w-full">
      <div className="gap-10 flex flex-col items-center container max-w-5xl">
        {/* Job Post Full Info */}
        <JobPostFullInfo job={jobPost} className="w-full" />

        {/* Job Suggestions Section */}
        <div className="space-y-6 w-full">
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

          {suggestions && suggestions.length > 0 ? (
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 gap-4 pr-4">
                {suggestions.map((job) => (
                  <Link
                    key={job.job_post_id}
                    href={"/view/job-post/" + job.job_post_id}
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
