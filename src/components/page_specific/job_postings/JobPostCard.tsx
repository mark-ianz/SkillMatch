"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Eye } from "lucide-react";
import Link from "next/link";

interface JobPostCardProps {
  post: {
    job_post_id: string;
    job_title: string;
    job_post_status_id: number;
    work_arrangement: string;
    available_positions: number;
    created_at: string;
    total_applications: number;
    new_applications: number;
    shortlisted: number;
    interview_scheduled: number;
    selected: number;
    offer_accepted: number;
  };
  statusColors: Record<number, { bg: string; text: string; label: string }>;
}

export default function JobPostCard({ post, statusColors }: JobPostCardProps) {
  const statusInfo = statusColors[post.job_post_status_id] || statusColors[1];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Title and Status */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{post.job_title}</h3>
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
                    {post.available_positions === 1 ? "Position" : "Positions"}
                  </Badge>
                </div>
              </div>
              <Link href={`/company/job-postings/${post.job_post_id}`}>
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
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Application Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-3">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Total</p>
                <p className="text-lg font-bold text-blue-600">
                  {post.total_applications}
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">New</p>
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
                <p className="text-xs text-muted-foreground mb-1">Selected</p>
                <p className="text-lg font-bold text-orange-600">
                  {post.selected}
                </p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Accepted</p>
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
}
