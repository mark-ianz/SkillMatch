"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useJobPostingStore } from "@/store/JobPostingStore";
import { JobPost, WorkArrangement } from "@/types/job_post.types";
import { jobPostingSchema } from "@/schema/job-posting.schema";
import ErrorArray from "@/components/common/ErrorArray";

import BasicInformation from "@/components/page_specific/job_post/BasicInformation";
import JobDescriptionSection from "@/components/page_specific/job_post/JobDescriptionSection";
import RequirementsSection from "@/components/page_specific/job_post/RequirementsSection";
import CompensationSection from "@/components/page_specific/job_post/CompensationSection";
import LocationSection from "@/components/page_specific/job_post/LocationSection";
import FormActions from "@/components/page_specific/job_post/FormActions";
import QueryClientProviderWrapper from "@/components/global/QueryClientProviderWrapper";

const WORK_ARRANGEMENTS: WorkArrangement[] = ["Remote", "On-site", "Hybrid"];

export default function JobPostingForm() {
  const { formData, updateField, reset } = useJobPostingStore();
  const [currentResponsibility, setCurrentResponsibility] = useState("");
  const [programInput, setProgramInput] = useState("");
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showResetConfirmDialog, setShowResetConfirmDialog] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof JobPost, value);
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "work_arrangement") {
      updateField("work_arrangement", value as WorkArrangement);
    } else if (name === "is_paid") {
      updateField("is_paid", value === "true");
    }
  };

  const addResponsibility = () => {
    if (currentResponsibility.trim()) {
      updateField("job_responsibilities", [
        ...(formData.job_responsibilities || []),
        currentResponsibility,
      ]);
      setCurrentResponsibility("");
    }
  };

  const removeResponsibility = (index: number) => {
    updateField(
      "job_responsibilities",
      (formData.job_responsibilities || []).filter((_, i) => i !== index)
    );
  };

  const addProgram = () => {
    if (programInput.trim()) {
      updateField("program_required", [
        ...(formData.program_required || []),
        programInput,
      ]);
      setProgramInput("");
    }
  };

  const removeProgram = (index: number) => {
    updateField(
      "program_required",
      (formData.program_required || []).filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = jobPostingSchema.safeParse(formData as JobPost);

    if (!result.success) {
      console.log(result);
      /* const errorMessages = result.error.map((err) => `${err.path.join(".")}: ${err.message}`)
      setErrors(errorMessages)
      setShowConfirmDialog(false) */
      return;
    }

    setErrors(null);
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Send to server
      console.log("[v0] Submitting job posting:", formData);
      setShowConfirmDialog(false);
      reset();
    } catch (error) {
      console.error("[v0] Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setErrors(null);
    setShowResetConfirmDialog(false);
  };

  return (
    <QueryClientProviderWrapper>
      <form onSubmit={handleSubmit} className="pb-8">
        <div className="grid gap-6">
          {errors && <ErrorArray error={errors} />}

          {/* Basic Information */}
          <BasicInformation
            formData={formData}
            updateField={updateField}
            handleSelectChange={handleSelectChange}
            handleInputChange={handleInputChange}
            WORK_ARRANGEMENTS={WORK_ARRANGEMENTS}
          />

          {/* Job Overview & Description */}
          <JobDescriptionSection
            formData={formData}
            currentResponsibility={currentResponsibility}
            setCurrentResponsibility={setCurrentResponsibility}
            addResponsibility={addResponsibility}
            removeResponsibility={removeResponsibility}
            handleInputChange={handleInputChange}
          />

          {/* Requirements */}
          <RequirementsSection
            formData={formData}
            programInput={programInput}
            setProgramInput={setProgramInput}
            addProgram={addProgram}
            removeProgram={removeProgram}
            updateField={updateField}
          />

          {/* Compensation */}
          <CompensationSection
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleInputChange={handleInputChange}
          />

          {/* Location */}
          <LocationSection
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Submit & Reset Buttons */}
          <FormActions setShowResetConfirmDialog={setShowResetConfirmDialog} />
        </div>
      </form>

      {/* Confirmation Dialog - Shows only on successful validation */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Job Posting</DialogTitle>
            <DialogDescription>
              Are you sure you want to post this job? Please review the details
              before confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto space-y-3">
            <div>
              <p className="text-sm font-medium">Job Title</p>
              <p className="text-sm text-muted-foreground">
                {formData.job_title}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Available Positions</p>
              <p className="text-sm text-muted-foreground">
                {formData.available_positions}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Work Arrangement</p>
              <p className="text-sm text-muted-foreground">
                {formData.work_arrangement}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">
                {formData.street_name}, {formData.barangay},{" "}
                {formData.city_municipality}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm & Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <Dialog
        open={showResetConfirmDialog}
        onOpenChange={setShowResetConfirmDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Form?</DialogTitle>
            <DialogDescription>
              Are you sure you want to clear all form data? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowResetConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleReset}>
              Clear Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </QueryClientProviderWrapper>
  );
}
