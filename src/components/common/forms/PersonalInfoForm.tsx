"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type PersonalInfoFormData = {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
};

type PersonalInfoFormProps = {
  data: PersonalInfoFormData;
  onChange: (data: PersonalInfoFormData) => void;
  readonly?: {
    first_name?: boolean;
    middle_name?: boolean;
    last_name?: boolean;
    phone_number?: boolean;
  };
};

export default function PersonalInfoForm({
  data,
  onChange,
  readonly = {},
}: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfoFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          value={data.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
          readOnly={readonly.first_name}
          required
        />
      </div>
      <div>
        <Label htmlFor="middle_name">
          Middle Name <span className="text-muted-foreground">(Optional)</span>
        </Label>
        <Input
          id="middle_name"
          value={data.middle_name}
          onChange={(e) => handleChange("middle_name", e.target.value)}
          readOnly={readonly.middle_name}
        />
      </div>
      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          value={data.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
          readOnly={readonly.last_name}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          value={data.phone_number}
          onChange={(e) => handleChange("phone_number", e.target.value)}
          readOnly={readonly.phone_number}
          required
        />
      </div>
    </div>
  );
}
