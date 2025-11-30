"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { JobPost } from "@/types/job_post.types";
import SelectBarangay from "@/components/common/input/SelectBarangay";
import { useJobPostingStore } from "@/store/JobPostingStore";
import SelectCityMunicipality from "@/components/common/input/SelectCityMunicipality";

type Props = {
  formData: Partial<JobPost>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function LocationSection({
  formData,
  handleInputChange,
}: Props) {
  const city_municipality = useJobPostingStore().formData.city_municipality;
  const updateField = useJobPostingStore().updateField;

  function handleBarangayChange(value: string) {
    updateField("barangay", value);
  }

  function handleCityMunicipalityChange(value: string) {
    updateField("city_municipality", value);
  }

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

        <div className="grid gap-2">
          <SelectCityMunicipality
            value={city_municipality}
            onValueChange={handleCityMunicipalityChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectBarangay
            value={formData.barangay}
            onValueChange={handleBarangayChange}
            selected_city_municipality={city_municipality}
          />

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
      </CardContent>
    </Card>
  );
}
