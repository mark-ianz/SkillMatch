"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JobPost } from "@/types/job_post.types";

type Props = {
  formData: Partial<JobPost>;
  handleSelectChange: (name: string, value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function CompensationSection({ formData, handleSelectChange, handleInputChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compensation</CardTitle>
        <CardDescription>Payment and allowance details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="is_paid">Is this a paid position?</Label>
          <Select
            value={formData.is_paid ? "true" : "false"}
            onValueChange={(value) => handleSelectChange("is_paid", value)}
          >
            <SelectTrigger id="is_paid">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes, Paid</SelectItem>
              <SelectItem value="false">No, Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.is_paid && (
          <div className="grid gap-2">
            <Label htmlFor="allowance_description">Allowance Description</Label>
            <Textarea
              id="allowance_description"
              name="allowance_description"
              placeholder="e.g., Daily allowance: PHP 500, Monthly stipend..."
              value={formData.allowance_description || ""}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
