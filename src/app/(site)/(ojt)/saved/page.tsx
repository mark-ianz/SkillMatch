"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2, TrendingUp, Users } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { JobPostPreview } from "@/components/page_specific/explore/job-posts/JobPostPreview";
import { CompanyPreview } from "@/components/page_specific/explore/company/CompanyPreview";
import { CompanyPost } from "@/components/page_specific/company_post/CompanyPost";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import {
  useSavedJobs,
  useUnsaveJob,
  useSavedCompanies,
  useUnsaveCompany,
  useSavedPosts,
  useUnsavePost,
} from "@/hooks/query/useSavedItems";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState("jobs");
  const router = useRouter();

  const { data: savedJobs, isLoading: jobsLoading } = useSavedJobs();
  const { data: savedCompanies, isLoading: companiesLoading } = useSavedCompanies();
  const { data: savedPosts, isLoading: postsLoading } = useSavedPosts();

  const unsaveJob = useUnsaveJob();
  const unsaveCompany = useUnsaveCompany();
  const unsavePost = useUnsavePost();

  const handleUnsaveJob = (job_post_id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    unsaveJob.mutate(job_post_id);
  };

  const handleUnsaveCompany = (company_id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    unsaveCompany.mutate(company_id);
  };

  const handleUnsavePost = (post_id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    unsavePost.mutate(post_id);
  };

  return (
    <MainLayout
      className="items-center"
      wrapperClassName="items-start flex-col"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Saved Items</h1>
        <p className="text-muted-foreground">
          Manage your saved job posts, company updates, and companies of
          interest
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="jobs" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Jobs ({savedJobs?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="posts" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Posts ({savedPosts?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="companies" className="gap-2">
            <Users className="h-4 w-4" />
            Companies ({savedCompanies?.length || 0})
          </TabsTrigger>
        </TabsList>

        {/* Saved Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          {jobsLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingGeneric />
            </div>
          ) : !savedJobs || savedJobs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bookmark className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-4">No saved jobs yet</p>
                <Button onClick={() => router.push("/explore")} variant="outline">
                  Browse Jobs
                </Button>
              </CardContent>
            </Card>
          ) : (
            savedJobs.map((job) => (
              <div key={job.job_post_id} className="relative group">
                <Link href={`/view/job-post?id=${job.job_post_id}`}>
                  <JobPostPreview job={job} />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleUnsaveJob(job.job_post_id, e)}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={unsaveJob.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </TabsContent>

        {/* Saved Company Posts Tab */}
        <TabsContent value="posts" className="space-y-4">
          {postsLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingGeneric />
            </div>
          ) : !savedPosts || savedPosts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No saved posts yet</p>
              </CardContent>
            </Card>
          ) : (
            savedPosts.map((post) => (
              <div key={post.post_id} className="relative group">
                <CompanyPost post={post} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleUnsavePost(post.post_id, e)}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  disabled={unsavePost.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </TabsContent>

        {/* Saved Companies Tab */}
        <TabsContent value="companies" className="space-y-4">
          {companiesLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingGeneric />
            </div>
          ) : !savedCompanies || savedCompanies.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No saved companies yet</p>
              </CardContent>
            </Card>
          ) : (
            savedCompanies.map((company) => (
              <div key={company.company_id} className="relative group">
                <Link href={`/view/company?id=${company.company_id}`}>
                  <CompanyPreview company={company} />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleUnsaveCompany(company.company_id, e)}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={unsaveCompany.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
