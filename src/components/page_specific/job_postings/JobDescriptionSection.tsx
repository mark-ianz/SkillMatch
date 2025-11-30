"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputWithLabel from "@/components/common/input/InputWithLabel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobPost } from "@/types/job_post.types";

type Props = {
  formData: Partial<JobPost>;
  currentResponsibility: string;
  setCurrentResponsibility: (v: string) => void;
  addResponsibility: () => void;
  removeResponsibility: (index: number) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function JobDescriptionSection({
  formData,
  currentResponsibility,
  setCurrentResponsibility,
  addResponsibility,
  removeResponsibility,
  handleInputChange,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
        <CardDescription>Overview and responsibilities</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <InputWithLabel
          name="job_overview"
          id="job_overview"
          label="Job Overview"
          placeholder="Describe the job overview..."
          as="textarea"
          value={formData.job_overview || ""}
          onChange={handleInputChange}
          rows={4}
        />

        <div className="grid gap-2">
          <Label>Responsibilities</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a responsibility..."
              value={currentResponsibility}
              onChange={(e) => setCurrentResponsibility(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addResponsibility();
                }
              }}
            />
            <Button variant={"default_employer"} type="button" onClick={addResponsibility}>
              Add
            </Button>
          </div>
          <ul className="space-y-2 mt-3">
            {formData.job_responsibilities?.map((resp, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2 bg-muted rounded"
              >
                <span className="text-sm">{resp}</span>
                <button
                  type="button"
                  onClick={() => removeResponsibility(idx)}
                  className="text-destructive hover:text-destructive/80"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>

        <InputWithLabel
          name="preferred_qualifications"
          id="preferred_qualifications"
          label="Preferred Qualifications"
          placeholder="Any additional qualifications..."
          as="textarea"
          value={formData.preferred_qualifications || ""}
          onChange={handleInputChange}
          rows={3}
        />
      </CardContent>
    </Card>
  );
}
