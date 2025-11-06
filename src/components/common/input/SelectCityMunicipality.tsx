import React from "react";
import city_municipality from "@/data/city_municipality.json";
import ComboBoxWithLabel from "@/components/common/input/ComboBoxWithLabel";

export default function SelectCityMunicipality({
  value,
  onValueChange,
} : {
  value: string | null | undefined;
  onValueChange: (value: string) => void;
}) {
  const city_municipality_list = Object.keys(city_municipality).map((key) => ({
    label: key,
    value: key,
  }));

  return (
    <ComboBoxWithLabel
      required={true}
      containerClassName="w-full"
      value={value || ""}
      items={city_municipality_list}
      searchFor="city/municipality"
      id="city-municipality"
      label="City/Municipality"
      onValueChange={onValueChange}
    />
  );
}
