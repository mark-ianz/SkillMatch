"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { JobPost } from "@/types/job_post.types";

type Props = {
  formData: Partial<JobPost>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function LocationSection({ formData, handleInputChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
        <CardDescription>Work address</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="street_name">Street Address</Label>
          <Input
            id="street_name"
            name="street_name"
            placeholder="e.g., 123 Tech Avenue"
            value={formData.street_name || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="barangay">Barangay</Label>
            <Input
              id="barangay"
              name="barangay"
              placeholder="Barangay"
              value={formData.barangay || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="postal_code">Postal Code</Label>
            <Input
              id="postal_code"
              name="postal_code"
              placeholder="Postal code"
              value={formData.postal_code || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="city_municipality">City/Municipality</Label>
          <Input
            id="city_municipality"
            name="city_municipality"
            placeholder="e.g., Makati City"
            value={formData.city_municipality || ""}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
