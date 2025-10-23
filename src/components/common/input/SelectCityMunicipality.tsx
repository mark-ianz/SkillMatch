import React from "react";
import city_municipality from "@/data/city_municipality.json";
import ComboBoxWithLabel from "@/components/common/input/ComboBoxWithLabel";
import useUserStore from "@/store/UserStore";

export default function SelectCityMunicipality() {
  const city_municipality_list = Object.keys(city_municipality).map((key) => ({
    label: key,
    value: key,
  }));

  const selected_city_municipality = useUserStore(
    (state) => state.city_municipality
  );

  const setCityMunicipality = useUserStore(
    (state) => state.setCityMunicipality
  );

  return (
    <ComboBoxWithLabel
      required={true}
      containerClassName="w-full"
      value={selected_city_municipality || ""}
      items={city_municipality_list}
      searchFor="city/municipality"
      id="city-municipality"
      label="City/Municipality"
      onValueChange={setCityMunicipality}
    />
  );
}
