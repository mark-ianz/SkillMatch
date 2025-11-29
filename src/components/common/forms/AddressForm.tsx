"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCityMunicipality from "@/components/common/input/SelectCityMunicipality";
import SelectBarangay from "@/components/common/input/SelectBarangay";

export type AddressFormData = {
  house_number: string;
  street_name: string;
  subdivision: string;
  postal_code: string;
  barangay: string;
  city_municipality: string;
};

type AddressFormProps = {
  data: AddressFormData;
  onChange: (data: AddressFormData) => void;
  useCustomSelects?: boolean; // For onboarding, use true; for settings, use false (regular inputs)
};

export default function AddressForm({
  data,
  onChange,
  useCustomSelects = false,
}: AddressFormProps) {
  const handleChange = (field: keyof AddressFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="house_number">House Number</Label>
          <Input
            id="house_number"
            placeholder="e.g., Blk 5 Lot 12 or 123"
            value={data.house_number}
            onChange={(e) => handleChange("house_number", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="street_name">Street Name</Label>
          <Input
            id="street_name"
            placeholder="e.g., Rizal Avenue or Sampaguita St."
            value={data.street_name}
            onChange={(e) => handleChange("street_name", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="subdivision">
            Subdivision <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="subdivision"
            placeholder="e.g., Green Meadows Village (Optional)"
            value={data.subdivision}
            onChange={(e) => handleChange("subdivision", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="postal_code">Postal Code</Label>
          <Input
            id="postal_code"
            placeholder="e.g., 1101"
            value={data.postal_code}
            onChange={(e) => handleChange("postal_code", e.target.value)}
            required
          />
        </div>
      </div>

      {useCustomSelects ? (
        <>
          <div>
            <SelectCityMunicipality
              value={data.city_municipality}
              onValueChange={(value) => handleChange("city_municipality", value)}
            />
          </div>
          <div>
            <SelectBarangay
              value={data.barangay}
              onValueChange={(value) => handleChange("barangay", value)}
              selected_city_municipality={data.city_municipality}
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="barangay">Barangay</Label>
            <Input
              id="barangay"
              value={data.barangay}
              onChange={(e) => handleChange("barangay", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="city_municipality">City/Municipality</Label>
            <Input
              id="city_municipality"
              value={data.city_municipality}
              onChange={(e) => handleChange("city_municipality", e.target.value)}
              required
            />
          </div>
        </div>
      )}
    </div>
  );
}
