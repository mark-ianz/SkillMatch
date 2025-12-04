"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCompanyJobPostsWithStatus } from "@/hooks/query/useApplications";
import { Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Users,
  Plus,
  Building2,
  TrendingUp,
  AlertCircle,
  Send,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import JobPostsFilter from "@/components/page_specific/job_postings/JobPostsFilter";
import JobPostCard from "@/components/page_specific/job_postings/JobPostCard";

const statusColors: Record<
  number,
  { bg: string; text: string; label: string }
> = {
  1: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  2: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
  3: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
  4: { bg: "bg-gray-100", text: "text-gray-700", label: "Disabled" },
  5: { bg: "bg-blue-100", text: "text-blue-700", label: "Filled" },
  6: { bg: "bg-gray-100", text: "text-gray-700", label: "Closed" },
  7: { bg: "bg-purple-100", text: "text-purple-700", label: "Onboarding" },
};

export default function CompanyJobPostsPage() {
  const { data: jobPosts, isLoading, error } = useCompanyJobPostsWithStatus();
  const [selectedStatuses, setSelectedStatuses] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [sortBy, setSortBy] = useState<string>("updated");

  // Filter job posts based on selected statuses
  const filteredJobPosts = jobPosts?.filter((post) =>
    selectedStatuses.length === 0 || selectedStatuses.includes(post.job_post_status_id)
  );

  // Sort job posts based on selected sort option
  const sortedJobPosts = filteredJobPosts?.sort((a, b) => {
    switch (sortBy) {
      case "updated":
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      case "created-newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "created-oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "applications":
        return (b.total_applications || 0) - (a.total_applications || 0);
      case "title":
        return a.job_title.localeCompare(b.job_title);
      default:
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });

  if (isLoading) {
    return (
      <div className="container max-w-7xl py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div className="container max-w-7xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load job posts. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalApplications =
    jobPosts?.reduce((sum, post) => sum + (post.total_applications || 0), 0) || 0;
  const activeJobs =
    jobPosts?.filter((post) => post.job_post_status_id === 1).length || 0;
  const totalSelected =
    jobPosts?.reduce((sum, post) => sum + (Number(post.selected) || 0), 0) || 0;
  const totalAccepted =
    jobPosts?.reduce((sum, post) => sum + (Number(post.offer_accepted) || 0), 0) || 0;

  return (
    <div className="container max-w-7xl py-8 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Postings</h1>
          <p className="text-muted-foreground">
            Manage your job posts and track applications
          </p>
        </div>
        <div className="flex gap-3">
          <JobPostsFilter
            selectedStatuses={selectedStatuses}
            onStatusChange={setSelectedStatuses}
          />
          <Link href="/company/post-job">
            <Button size="lg" variant="default_employer">
              <Plus className="mr-2 h-5 w-5" />
              Create New Job Post
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Active Jobs
                </p>
                <p className="text-3xl font-bold">{activeJobs}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Applications
                </p>
                <p className="text-3xl font-bold">{totalApplications}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Selected
                </p>
                <p className="text-3xl font-bold">{totalSelected}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Send className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Accepted
                </p>
                <p className="text-3xl font-bold">{totalAccepted}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Job Posts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Job Posts</h2>
          <div className="flex items-center gap-4">
            {filteredJobPosts && filteredJobPosts.length > 0 && (
              <>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[220px]">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Recently Updated</SelectItem>
                    <SelectItem value="created-newest">Date Posted: Newest</SelectItem>
                    <SelectItem value="created-oldest">Date Posted: Oldest</SelectItem>
                    <SelectItem value="applications">Total Applications</SelectItem>
                    <SelectItem value="title">Job Title (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredJobPosts.length} of {jobPosts?.length || 0} posts
                </p>
              </>
            )}
          </div>
        </div>

        {!sortedJobPosts || sortedJobPosts.length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <Building2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {!jobPosts || jobPosts.length === 0
                    ? "No job posts yet"
                    : "No posts match your filters"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {!jobPosts || jobPosts.length === 0
                    ? "Create your first job posting to start receiving applications"
                    : "Try adjusting your filter settings"}
                </p>
                {(!jobPosts || jobPosts.length === 0) && (
                  <Link href="/company/post-job">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Job Post
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          sortedJobPosts.map((post) => (
            <JobPostCard
              key={post.job_post_id}
              post={post}
              statusColors={statusColors}
            />
          ))
        )}
      </motion.div>
    </div>
  );
}
