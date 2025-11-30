"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JOB_POST_STATUSES } from "@/types/admin.types";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import JobPostDetailsDialog from "./JobPostDetailsDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { JobPost } from "@/types/job_post.types";

type JobPostWithCompany = JobPost & {
  company_name: string;
  company_email: string;
};

export default function JobPostsTable() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedJobPost, setSelectedJobPost] = useState<JobPostWithCompany | null>(null);

  const { data: jobPosts, isLoading } = useQuery({
    queryKey: ["admin-job-posts", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      const response = await api.get<JobPostWithCompany[]>(
        `/admin/job-posts?${params.toString()}`
      );
      return response.data;
    },
  });

  const getStatusBadge = (statusId: number, statusName: string) => {
    const status = JOB_POST_STATUSES.find((s) => s.value === statusId);
    return (
      <Badge variant={status?.variant || "default"}>
        {statusName || "Unknown"}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="border rounded-lg p-4">
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {JOB_POST_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value.toString()}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          {jobPosts?.length || 0} job posts found
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Work Type</TableHead>
              <TableHead>Positions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobPosts && jobPosts.length > 0 ? (
              jobPosts.map((job) => (
                <TableRow key={job.job_post_id}>
                  <TableCell className="font-medium">
                    {job.job_title}
                  </TableCell>
                  <TableCell>{job.company_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.work_arrangement}</Badge>
                  </TableCell>
                  <TableCell>{job.available_positions}</TableCell>
                  <TableCell>
                    {getStatusBadge(job.job_post_status_id, job.job_post_status || "")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(job.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedJobPost(job)}
                    >
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No job posts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedJobPost && (
        <JobPostDetailsDialog
          jobPost={selectedJobPost}
          open={!!selectedJobPost}
          onOpenChange={(open: boolean) => !open && setSelectedJobPost(null)}
        />
      )}
    </div>
  );
}
