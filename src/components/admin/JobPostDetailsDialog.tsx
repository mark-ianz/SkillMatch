"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_POST_STATUSES } from "@/types/admin.types";
import { JobPost } from "@/types/job_post.types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { format } from "date-fns";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  DollarSign,
} from "lucide-react";

type JobPostWithCompany = JobPost & {
  company_name: string;
  company_email: string;
};

interface JobPostDetailsDialogProps {
  jobPost: JobPostWithCompany;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function JobPostDetailsDialog({
  jobPost,
  open,
  onOpenChange,
}: JobPostDetailsDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    jobPost.job_post_status_id.toString()
  );
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async (status_id: number) => {
      await api.patch(`/admin/job-posts/${jobPost.job_post_id}`, {
        status_id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-job-posts"] });
      onOpenChange(false);
    },
  });

  const handleSave = () => {
    const statusId = parseInt(selectedStatus);
    if (statusId !== jobPost.job_post_status_id) {
      updateStatusMutation.mutate(statusId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{jobPost.job_title}</DialogTitle>
          <DialogDescription>
            Review and manage this job posting
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company Information */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Company Information
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Company:</span>
                <p className="font-medium">{jobPost.company_name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Contact:</span>
                <p className="font-medium">{jobPost.company_email}</p>
              </div>
            </div>
          </div>

          {/* Job Overview */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Job Overview</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {jobPost.job_overview}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Work Type</p>
                  <Badge variant="outline">{jobPost.work_arrangement}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Positions</p>
                  <p className="font-medium">{jobPost.available_positions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          {jobPost.work_arrangement !== "Remote" && (
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </h3>
              <div className="text-sm">
                <p>{jobPost.street_name}</p>
                <p className="text-muted-foreground">
                  {jobPost.barangay}, {jobPost.city_municipality} {jobPost.postal_code}
                </p>
              </div>
            </div>
          )}

          {/* Responsibilities */}
          <div className="space-y-2">
            <h3 className="font-semibold">Responsibilities</h3>
            {Array.isArray(jobPost.job_responsibilities) ? (
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                {jobPost.job_responsibilities.map((resp: string, index: number) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {jobPost.job_responsibilities}
              </p>
            )}
          </div>

          {/* Preferred Qualifications */}
          {jobPost.preferred_qualifications && (
            <div className="space-y-2">
              <h3 className="font-semibold">Preferred Qualifications</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {jobPost.preferred_qualifications}
              </p>
            </div>
          )}

          {/* Courses Required */}
          {jobPost.courses_required && jobPost.courses_required.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Required Courses
              </h3>
              <div className="flex flex-wrap gap-2">
                {jobPost.courses_required.map((course: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="grid grid-cols-2 gap-4">
            {jobPost.soft_skills && jobPost.soft_skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {jobPost.soft_skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {jobPost.technical_skills && jobPost.technical_skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {jobPost.technical_skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Categories */}
          {jobPost.job_categories && jobPost.job_categories.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {jobPost.job_categories.map((category: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Compensation */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Compensation
            </h3>
            <div className="text-sm">
              <p className="font-medium">{jobPost.is_paid ? "Paid" : "Unpaid"}</p>
              {jobPost.allowance_description && (
                <p className="text-muted-foreground mt-1">
                  {jobPost.allowance_description}
                </p>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Posted: {format(new Date(jobPost.created_at), "MMM d, yyyy")}
              </span>
            </div>
            {jobPost.updated_at && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Updated: {format(new Date(jobPost.updated_at), "MMM d, yyyy")}
                </span>
              </div>
            )}
          </div>

          {/* Status Update */}
          <div className="space-y-3 pt-4 border-t">
            <div>
              <label className="text-sm font-medium">Update Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_POST_STATUSES.map((status) => (
                    <SelectItem
                      key={status.value}
                      value={status.value.toString()}
                    >
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  updateStatusMutation.isPending ||
                  selectedStatus === jobPost.job_post_status_id.toString()
                }
              >
                {updateStatusMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
