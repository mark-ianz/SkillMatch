import { MapPin } from "lucide-react";
import React from "react";

export default function Location({
  barangay,
  city_municipality,
}: {
  barangay: string;
  city_municipality: string;
}) {
  const fullAddress = `${barangay}, ${city_municipality}`;

  return (
    <div className="flex items-center gap-1.5">
      <MapPin className="w-4 h-4" />
      <span>{fullAddress}</span>
    </div>
  );
}
