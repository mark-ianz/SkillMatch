"use client";

import { useCompanyJobPostsWithStats } from "@/hooks/query/useApplications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  MapPin,
  Users,
  Calendar,
  Eye,
  Plus,
  Building2,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const { data: jobPosts, isLoading, error } = useCompanyJobPostsWithStats();

  if (isLoading) {
    return (
      <div className="container max-w-7xl py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
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
    jobPosts?.reduce((sum, post) => sum + post.total_applications, 0) || 0;
  const activeJobs =
    jobPosts?.filter((post) => post.job_post_status_id === 1).length || 0;
  const totalOffers =
    jobPosts?.reduce((sum, post) => sum + post.offer_sent, 0) || 0;
  const totalAccepted =
    jobPosts?.reduce((sum, post) => sum + post.offer_accepted, 0) || 0;

  return (
    <div className="container max-w-7xl py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Postings</h1>
          <p className="text-muted-foreground">
            Manage your job posts and track applications
          </p>
        </div>
        <Link href="/company/create-post">
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create New Job Post
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
                  Offers Sent
                </p>
                <p className="text-3xl font-bold">{totalOffers}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Offers Accepted
                </p>
                <p className="text-3xl font-bold">{totalAccepted}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Posts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">All Job Posts</h2>

        {!jobPosts || jobPosts.length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <Building2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No job posts yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first job posting to start receiving applications
                </p>
                <Link href="/company/create-post">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Job Post
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          jobPosts.map((post) => {
            const statusInfo =
              statusColors[post.job_post_status_id] || statusColors[1];

            return (
              <Card
                key={post.job_post_id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Title and Status */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {post.job_title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={`${statusInfo.bg} ${statusInfo.text} border-0`}
                            >
                              {statusInfo.label}
                            </Badge>
                            <Badge variant="outline">
                              <Briefcase className="mr-1 h-3 w-3" />
                              {post.work_arrangement}
                            </Badge>
                            <Badge variant="outline">
                              {post.available_positions}{" "}
                              {post.available_positions === 1
                                ? "Position"
                                : "Positions"}
                            </Badge>
                          </div>
                        </div>
                        <Link href={`/company/job-posts/${post.job_post_id}`}>
                          <Button variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </Link>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Posted{" "}
                            {new Date(post.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Application Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-3">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            Total
                          </p>
                          <p className="text-lg font-bold text-blue-600">
                            {post.total_applications}
                          </p>
                        </div>
                        <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            New
                          </p>
                          <p className="text-lg font-bold text-purple-600">
                            {post.new_applications}
                          </p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            Shortlisted
                          </p>
                          <p className="text-lg font-bold text-indigo-600">
                            {post.shortlisted}
                          </p>
                        </div>
                        <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            Interviews
                          </p>
                          <p className="text-lg font-bold text-cyan-600">
                            {post.interview_scheduled}
                          </p>
                        </div>
                        <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            Offers
                          </p>
                          <p className="text-lg font-bold text-orange-600">
                            {post.offer_sent}
                          </p>
                        </div>
                        <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            Accepted
                          </p>
                          <p className="text-lg font-bold text-green-600">
                            {post.offer_accepted}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
