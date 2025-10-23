import ComboBoxWithLabel from "@/components/common/input/ComboBoxWithLabel";
import city_municipality from "@/data/city_municipality.json";
import useUserStore from "@/store/UserStore";
import React from "react";

export default function SelectBarangay() {
  const selected_city_municipality = useUserStore(
    (state) => state.city_municipality
  );

  const barangay_list = city_municipality[
    (selected_city_municipality as keyof typeof city_municipality) || ""
  ]?.barangay_list.map((barangay) => ({
    label: barangay,
    value: barangay,
  }));

  const setBarangay = useUserStore((state) => state.setBarangay);
  const barangay = useUserStore((state) => state.barangay);

  return (
    <ComboBoxWithLabel
      required={true}
      containerClassName="w-full"
      value={barangay || ""}
      disabled={!selected_city_municipality}
      items={barangay_list}
      searchFor="barangay"
      id="barangay"
      label="Barangay"
      onValueChange={setBarangay}
    />
  );
}
