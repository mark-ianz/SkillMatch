import MainLayout from "@/components/layout/MainLayout";
import { JobPostFullInfo } from "@/components/page_specific/job_postings/JobPostFullInfo";
import Link from "next/link";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { JobPostingServices } from "@/services/job-posting.services";
import { redirect } from "next/navigation";
import { getRoleName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AnimatedJobContent } from "@/components/page_specific/job_postings/AnimatedJobContent";
import { AnimatedJobSuggestionsSection } from "@/components/page_specific/job_postings/AnimatedJobSuggestionsSection";

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
        {/* Main Content */}
        <AnimatedJobContent>
          {/* Back Button */}
          <Link href="/explore/job-postings" className="self-start">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Postings
            </Button>
          </Link>

          {/* Job Post Full Info */}
          <JobPostFullInfo
            isFullView={true}
            apply_button_classname="w-fit px-8 py-1 text-sm"
            job={jobPost}
            className="w-full"
          />
        </AnimatedJobContent>

        {/* Job Suggestions Section */}
        <AnimatedJobSuggestionsSection suggestions={suggestions} />
      </div>
    </MainLayout>
  );
}
