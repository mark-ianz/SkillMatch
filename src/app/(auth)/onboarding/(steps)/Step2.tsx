import React from "react";
import StepContainer from "../../../../components/page_specific/onboarding/StepContainer";
import RowContainer from "../../../../components/common/input/RowContainer";
import InputWithLabel from "@/components/common/input/InputWithLabel";
import useSignupStore from "@/store/SignupStore";
import { Button } from "@/components/ui/button";
import SelectCityMunicipality from "../../../../components/common/input/SelectCityMunicipality";
import SelectBarangay from "../../../../components/common/input/SelectBarangay";

export default function Step2() {
  const street_name = useSignupStore((state) => state.street_name);

  const setStreetName = useSignupStore((state) => state.setStreetName);
  const setHouseNumber = useSignupStore((state) => state.setHouseNumber);
  const setSubdivision = useSignupStore((state) => state.setSubdivision);
  const setPostalCode = useSignupStore((state) => state.setPostalCode);

  return (
    <StepContainer>
      <RowContainer>
        <InputWithLabel
          required={true}
          placeholder="e.g., Blk 5 Lot 12 or 123"
          onChange={(e) => setHouseNumber(e.target.value)}
          label="House Number"
          containerClassName="w-full"
        />
        <InputWithLabel
          value={street_name}
          required={true}
          placeholder="e.g., Rizal Avenue or Sampaguita St."
          onChange={(e) => setStreetName(e.target.value)}
          label="Street Name"
          containerClassName="w-full"
        />
      </RowContainer>

      <RowContainer>
        <InputWithLabel
          placeholder="e.g., Green Meadows Village (Optional)"
          onChange={(e) => setSubdivision(e.target.value)}
          label="Subdivision"
          containerClassName="w-full"
        />
        <InputWithLabel
          required={true}
          placeholder="e.g., 1101"
          onChange={(e) => setPostalCode(e.target.value)}
          label="Postal Code"
          containerClassName="w-full"
        />
      </RowContainer>

      <RowContainer>
        <SelectCityMunicipality />
      </RowContainer>

      <RowContainer>
        <SelectBarangay />
      </RowContainer>

      <Button type="button" className="ml-auto w-24">
        Next
      </Button>
    </StepContainer>
  );
}
