"use client";

import React, { useEffect } from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import InputWithLabel from "@/components/common/input/InputWithLabel";
import ComboBoxWithLabel from "@/components/common/input/ComboBoxWithLabel";
import useCompanyStore from "@/store/onboarding/company.onboarding.store";
import { Button } from "@/components/ui/button";
import RowContainer from "@/components/common/input/RowContainer";
import { employerOnboardingStepOneSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";
import { formatZodError, getAllCities, getBarangaysByCity } from "@/lib/utils";
import { useUpdateStepOneOnboardingCompany } from "@/hooks/query/useOnboardingCompany";
import { useSession } from "next-auth/react";
import { ItemList } from "@/components/common/input/ComboBox";

export default function Step1() {
  const session = useSession();
  const { mutate, isPending } = useUpdateStepOneOnboardingCompany(session.data?.user.company_id);

  const company_name = useCompanyStore((s) => s.company_name || "");
  const company_email = useCompanyStore((s) => s.company_email || "");
  const telephone_number = useCompanyStore((s) => s.telephone_number || "");
  const phone_number = useCompanyStore((s) => s.phone_number || "");
  const city_municipality = useCompanyStore((s) => s.city_municipality || "");
  const barangay = useCompanyStore((s) => s.barangay || "");
  const date_founded = useCompanyStore((s) => s.date_founded || "");

  const setCompanyName = useCompanyStore((s) => s.setCompanyName);
  const setCompanyEmail = useCompanyStore((s) => s.setCompanyEmail);
  const setTelephoneNumber = useCompanyStore((s) => s.setTelephoneNumber);
  const setPhoneNumber = useCompanyStore((s) => s.setPhoneNumber);
  const setCityMunicipality = useCompanyStore((s) => s.setCityMunicipality);
  const setBarangay = useCompanyStore((s) => s.setBarangay);
  const setDateFounded = useCompanyStore((s) => s.setDateFounded);

  const setError = useOnboardingStore((state) => state.setError);

  // Get cities and barangays
  const cities = getAllCities(true) as ItemList[];
  const barangays = city_municipality ? (getBarangaysByCity(city_municipality, true) as ItemList[]) : [];

  // Reset barangay when city_municipality changes
  useEffect(() => {
    if (city_municipality && barangay) {
      const validBarangays = getBarangaysByCity(city_municipality) as string[];
      if (!validBarangays.includes(barangay)) {
        setBarangay("");
      }
    }
  }, [city_municipality, barangay, setBarangay]);

  function handleNext() {
    try {
      // clear previous errors
      setError(null);

      // get snapshot of all fields
      const data = {
        company_name: useCompanyStore.getState().company_name,
        company_email: useCompanyStore.getState().company_email,
        telephone_number: useCompanyStore.getState().telephone_number,
        phone_number: useCompanyStore.getState().phone_number,
        city_municipality: useCompanyStore.getState().city_municipality,
        barangay: useCompanyStore.getState().barangay,
        date_founded: useCompanyStore.getState().date_founded,
      };
      const parsed = employerOnboardingStepOneSchema.parse(data);

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
          label="Company Name"
          containerClassName="grow"
          id="company_name"
          placeholder="Enter your company name"
          value={company_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
          required
        />

        <InputWithLabel
          label="Company Email Address"
          containerClassName="grow"
          id="company_email"
          type="email"
          placeholder="company@domain.com"
          value={company_email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyEmail(e.target.value)}
          required
        />
      </RowContainer>

      <RowContainer>
        <InputWithLabel
          label="Telephone Number"
          containerClassName="grow"
          id="telephone_number"
          placeholder="Enter your telephone number"
          value={telephone_number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelephoneNumber(e.target.value)}
          required
        />

        <InputWithLabel
          containerClassName="grow"
          label="Phone Number"
          id="phone_number"
          placeholder="Enter your phone number"
          value={phone_number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
          required
        />
      </RowContainer>

      <RowContainer>
        <ComboBoxWithLabel
          containerClassName="grow"
          id="city_municipality"
          label="City/Municipality"
          searchFor="City/Municipality"
          value={city_municipality}
          items={cities}
          onValueChange={setCityMunicipality}
          required
        />

        <ComboBoxWithLabel
          containerClassName="grow"
          id="barangay"
          label="Barangay"
          searchFor="barangay"
          value={barangay}
          items={barangays}
          onValueChange={setBarangay}
          disabled={!city_municipality}
          required
        />
      </RowContainer>

      <RowContainer>
        <InputWithLabel
          label="Date Founded"
          containerClassName="grow"
          id="date_founded"
          type="date"
          value={date_founded}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateFounded(e.target.value)}
          required
        />
      </RowContainer>

      <Button
        disabled={isPending}
        onClick={handleNext}
        variant={"default_employer"}
        type="button"
        className="ml-auto w-24"
      >
        Next
      </Button>
    </StepContainer>
  );
}
