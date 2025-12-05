import ComboBoxWithLabel from "@/components/common/input/ComboBoxWithLabel";
import city_municipality from "@/data/city_municipality.json";
import React from "react";

export default function SelectBarangay({
  onValueChange,
  value,
  selected_city_municipality,
}: {
  onValueChange: (value: string) => void;
  value: string | undefined | null;
  selected_city_municipality: string | undefined | null; // required, because barangays depend on the selected city/municipality
}) {
  const barangay_list = selected_city_municipality
    ? city_municipality[
        selected_city_municipality as keyof typeof city_municipality
      ]?.barangay_list.map((barangay) => ({
        label: barangay,
        value: barangay,
      })) || []
    : [];

  return (
    <ComboBoxWithLabel
      required={true}
      containerClassName="w-full"
      value={value || ""}
      disabled={!selected_city_municipality}
      items={barangay_list}
      searchFor="barangay"
      id="barangay"
      label="Barangay"
      onValueChange={onValueChange}
    />
  );
}
