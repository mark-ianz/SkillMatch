import React from "react";
import StepContainer from "../../../../components/page_specific/onboarding/StepContainer";
import RowContainer from "../../../../components/common/input/RowContainer";
import InputWithLabel from "@/components/common/input/InputWithLabel";
import useSignupStore from "@/store/SignupStore";
import { Button } from "@/components/ui/button";
import SelectCityMunicipality from "../../../../components/common/input/SelectCityMunicipality";
import SelectBarangay from "../../../../components/common/input/SelectBarangay";
import { onboardingStepTwoSchema } from "@/schema/onboarding";
import { useUpdateStepTwoOnboarding } from "@/hooks/query/useOnboarding";
import { useSession } from "next-auth/react";
import { ZodError } from "zod";
import { formatZodError } from "@/lib/utils";

export default function Step2() {
  const session = useSession();

  const farthestStep = useSignupStore((state) => state.farthestStep);

  const { mutate, isPending } = useUpdateStepTwoOnboarding(
    session.data?.user.user_id,
    farthestStep
  );

  const house_number = useSignupStore((state) => state.house_number);
  const subdivision = useSignupStore((state) => state.subdivision);
  const postal_code = useSignupStore((state) => state.postal_code);
  const street_name = useSignupStore((state) => state.street_name);

  const setStreetName = useSignupStore((state) => state.setStreetName);
  const setHouseNumber = useSignupStore((state) => state.setHouseNumber);
  const setSubdivision = useSignupStore((state) => state.setSubdivision);
  const setPostalCode = useSignupStore((state) => state.setPostalCode);
  const setError = useSignupStore((state) => state.setError);

  // Submit handler
  async function handleNextStep() {
    // get all the data from Step 2 on the store
    const house_number = useSignupStore.getState().house_number;
    const subdivision = useSignupStore.getState().subdivision;
    const postal_code = useSignupStore.getState().postal_code;
    const city_municipality = useSignupStore.getState().city_municipality;
    const barangay = useSignupStore.getState().barangay;

    // validate the data
    try {
      // clear previous errors
      setError(null);

      const parsed = onboardingStepTwoSchema.parse({
        house_number,
        street_name,
        subdivision,
        postal_code,
        city_municipality,
        barangay,
      });

      // update the user info on the backend
      mutate(parsed);
    } catch (error) {
      // catch the zod error
      if (error instanceof ZodError) {
        setError(formatZodError(error));
        return;
      }
    }
  }
  return (
    <StepContainer>
      <RowContainer>
        <InputWithLabel
          value={house_number}
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
          value={subdivision || ""}
          placeholder="e.g., Green Meadows Village (Optional)"
          onChange={(e) => setSubdivision(e.target.value)}
          label="Subdivision"
          containerClassName="w-full"
        />
        <InputWithLabel
          value={postal_code}
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

      <Button
        disabled={isPending}
        onClick={handleNextStep}
        type="button"
        className="ml-auto w-24"
      >
        Next
      </Button>
    </StepContainer>
  );
}
