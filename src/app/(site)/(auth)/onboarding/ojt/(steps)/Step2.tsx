import React from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import RowContainer from "@/components/common/input/RowContainer";
import InputWithLabel from "@/components/common/input/InputWithLabel";
import { Button } from "@/components/ui/button";
import SelectCityMunicipality from "@/components/common/input/SelectCityMunicipality";
import SelectBarangay from "@/components/common/input/SelectBarangay";
import { onboardingStepTwoSchema } from "@/schema/onboarding";
import { useUpdateStepTwoOnboardingOJT } from "@/hooks/query/useOnboardingOJT";
import { useSession } from "next-auth/react";
import { ZodError } from "zod";
import { formatZodError } from "@/lib/utils";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";
import useOJTProfileStore from "@/store/onboarding/ojt.onboarding.store";

export default function Step2() {
  const session = useSession();

  const { mutate, isPending } = useUpdateStepTwoOnboardingOJT(
    session.data?.user.user_id
  );

  const house_number = useOJTProfileStore((state) => state.house_number);
  const subdivision = useOJTProfileStore((state) => state.subdivision);
  const postal_code = useOJTProfileStore((state) => state.postal_code);
  const street_name = useOJTProfileStore((state) => state.street_name);
  const barangay = useOJTProfileStore((state) => state.barangay);
  const city_municipality = useOJTProfileStore((state) => state.city_municipality);

  const setStreetName = useOJTProfileStore((state) => state.setStreetName);
  const setHouseNumber = useOJTProfileStore((state) => state.setHouseNumber);
  const setSubdivision = useOJTProfileStore((state) => state.setSubdivision);
  const setPostalCode = useOJTProfileStore((state) => state.setPostalCode);
  const setError = useOnboardingStore((state) => state.setError);
  const setBarangay = useOJTProfileStore((state) => state.setBarangay);
  const setCityMunicipality = useOJTProfileStore(
    (state) => state.setCityMunicipality
  );

  // Submit handler
  async function handleNextStep() {
    // get all the current data from Step 2 on the store
    const house_number = useOJTProfileStore.getState().house_number;
    const subdivision = useOJTProfileStore.getState().subdivision;
    const postal_code = useOJTProfileStore.getState().postal_code;
    const city_municipality = useOJTProfileStore.getState().city_municipality;
    const barangay = useOJTProfileStore.getState().barangay;
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setHouseNumber(e.target.value)
          }
          label="House Number"
          containerClassName="w-full"
        />
        <InputWithLabel
          value={street_name}
          required={true}
          placeholder="e.g., Rizal Avenue or Sampaguita St."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStreetName(e.target.value)
          }
          label="Street Name"
          containerClassName="w-full"
        />
      </RowContainer>

      <RowContainer>
        <InputWithLabel
          optional={true}
          value={subdivision || ""}
          placeholder="e.g., Green Meadows Village (Optional)"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSubdivision(e.target.value)
          }
          label="Subdivision"
          containerClassName="w-full"
        />
        <InputWithLabel
          value={postal_code}
          required={true}
          placeholder="e.g., 1101"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPostalCode(e.target.value)
          }
          label="Postal Code"
          containerClassName="w-full"
        />
      </RowContainer>

      <RowContainer>
        <SelectCityMunicipality
          onValueChange={setCityMunicipality}
          value={city_municipality}
        />
      </RowContainer>

      <RowContainer>
        <SelectBarangay
          value={barangay}
          onValueChange={setBarangay}
          selected_city_municipality={city_municipality}
        />
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
