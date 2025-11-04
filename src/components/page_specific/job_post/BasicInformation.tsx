"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputWithLabel from "@/components/common/input/InputWithLabel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobPost, WorkArrangement } from "@/types/job_post.types";

type Props = {
  formData: Partial<JobPost>;
  updateField: <K extends keyof JobPost>(field: K, value: JobPost[K]) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  WORK_ARRANGEMENTS: WorkArrangement[];
};

export default function BasicInformation({
  formData,
  updateField,
  handleSelectChange,
  handleInputChange,
  WORK_ARRANGEMENTS,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Job title and position details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <InputWithLabel
          name="job_title"
          id="job_title"
          label="Job Title"
          placeholder="e.g., Software Engineer Intern"
          value={formData.job_title || ""}
          onChange={handleInputChange}
        />

        <InputWithLabel
          name="available_positions"
          id="available_positions"
          label="Available Positions"
          placeholder="e.g., 5"
          type="number"
          min="1"
          value={formData.available_positions || 1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateField(
              "available_positions",
              Number.parseInt(e.target.value) || 1
            )
          }
        />

        <div className="grid gap-2">
          <Label htmlFor="work_arrangement">Work Arrangement</Label>
          <Select
            value={formData.work_arrangement || "On-site"}
            onValueChange={(value) =>
              handleSelectChange("work_arrangement", value)
            }
          >
            <SelectTrigger id="work_arrangement">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {WORK_ARRANGEMENTS.map((arr) => (
                <SelectItem key={arr} value={arr}>
                  {arr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
