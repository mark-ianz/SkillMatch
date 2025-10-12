import ComboBoxWithLabel from "@/components/common/input/ComboBoxWithLabel";
import useSignupStore from "@/store/SignupStore";
import city_municipality from "@/data/city_municipality.json";
import React from "react";

export default function SelectBarangay() {
  const selected_city_municipality = useSignupStore(
    (state) => state.city_municipality
  );

  const barangay_list = city_municipality[
    (selected_city_municipality as keyof typeof city_municipality) || ""
  ]?.barangay_list.map((barangay) => ({
    label: barangay,
    value: barangay,
  }));

  const setBarangay = useSignupStore((state) => state.setBarangay);
  const barangay = useSignupStore((state) => state.barangay);

  return (
    <ComboBoxWithLabel
      containerClassName="w-full"
      value={barangay}
      disabled={!selected_city_municipality}
      items={barangay_list}
      searchFor="barangay"
      id="barangay"
      label="Barangay"
      onValueChange={setBarangay}
    />
  );
}
