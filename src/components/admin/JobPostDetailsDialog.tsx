"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
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
  const [rejectedReason, setRejectedReason] = useState<string>(
    jobPost.rejected_reason || ""
  );
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async (payload: { status_id: number; rejected_reason?: string }) => {
      await api.patch(`/admin/job-postings/${jobPost.job_post_id}`, {
        job_post_status_id: payload.status_id,
        rejected_reason: payload.rejected_reason,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-job-postings"] });
      onOpenChange(false);
    },
  });

  const handleSave = () => {
    const statusId = parseInt(selectedStatus);
    
    // Validate rejection reason if status is rejected
    if (statusId === 3 && !rejectedReason.trim()) {
      return; // Don't submit if rejected without reason
    }
    
    if (statusId !== jobPost.job_post_status_id || (statusId === 3 && rejectedReason !== jobPost.rejected_reason)) {
      updateStatusMutation.mutate({ 
        status_id: statusId,
        rejected_reason: statusId === 3 ? rejectedReason : undefined 
      });
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

            {/* Rejection Reason - Show when Rejected status is selected */}
            {selectedStatus === "3" && (
              <div className="space-y-2 p-4 border border-red-200 rounded-lg bg-red-50">
                <Label htmlFor="rejected_reason" className="text-red-900 font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Rejection Reason *
                </Label>
                <Textarea
                  id="rejected_reason"
                  value={rejectedReason}
                  onChange={(e) => setRejectedReason(e.target.value)}
                  placeholder="Please provide a detailed reason for rejecting this job post. This will be shown to the company."
                  className="min-h-[100px] border-red-200 focus:border-red-400"
                  required
                />
                {!rejectedReason.trim() && (
                  <p className="text-sm text-red-600">
                    Rejection reason is required
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  updateStatusMutation.isPending ||
                  (selectedStatus === jobPost.job_post_status_id.toString() && 
                    (selectedStatus !== "3" || rejectedReason === jobPost.rejected_reason)) ||
                  (selectedStatus === "3" && !rejectedReason.trim())
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
