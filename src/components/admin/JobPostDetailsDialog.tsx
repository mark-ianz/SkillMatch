"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { JobPostFullInfo } from "@/components/page_specific/job_postings/JobPostFullInfo";

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
      await api.patch(`/admin/job-postings/${jobPost.job_post_id}`, {
        job_post_status_id: status_id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-job-postings"] });
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Job Post Details</DialogTitle>
          <DialogDescription>
            Review and manage this job posting
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Post Full Info Component */}
          <JobPostFullInfo job={jobPost} />

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
