"use client";

import React from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import InputWithLabel from "@/components/common/input/InputWithLabel";
import useCompanyStore from "@/store/onboarding/company.onboarding.store";
import { Button } from "@/components/ui/button";
import RowContainer from "@/components/common/input/RowContainer";
import { employerOnboardingStepOneSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";
import { formatZodError } from "@/lib/utils";
import { useUpdateStepOneOnboardingCompany } from "@/hooks/query/useOnboardingCompany";
import { useSession } from "next-auth/react";

export default function Step1() {
  const session = useSession();
  const { mutate, isPending } = useUpdateStepOneOnboardingCompany(session.data?.user.company_id);

  const company_name = useCompanyStore((s) => s.company_name || "");
  const company_email = useCompanyStore((s) => s.company_email || "");
  const telephone_number = useCompanyStore((s) => s.telephone_number || "");
  const phone_number = useCompanyStore((s) => s.phone_number || "");
  const website = useCompanyStore((s) => s.website || "");
  const facebook_page = useCompanyStore((s) => s.facebook_page || "");
  const setCompanyName = useCompanyStore((s) => s.setCompanyName);
  const setCompanyEmail = useCompanyStore((s) => s.setCompanyEmail);
  const setTelephoneNumber = useCompanyStore((s) => s.setTelephoneNumber);
  const setPhoneNumber = useCompanyStore((s) => s.setPhoneNumber);
  const setWebsite = useCompanyStore((s) => s.setWebsite);
  const setFacebookPage = useCompanyStore((s) => s.setFacebookPage);

  const setError = useOnboardingStore((state) => state.setError);

  function handleNext() {
    console.log("first")
    // validate the data
    try {
      // clear previous errors
      setError(null);

      // get snapshot of all fields
      const data = {
        company_name: useCompanyStore.getState().company_name,
        company_email: useCompanyStore.getState().company_email,
        telephone_number: useCompanyStore.getState().telephone_number,
        phone_number: useCompanyStore.getState().phone_number,
        website: useCompanyStore.getState().website,
        facebook_page: useCompanyStore.getState().facebook_page,
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
        />

        <InputWithLabel
          label="Company Email Address"
          containerClassName="grow"
          id="company_email"
          type="email"
          placeholder="company@domain.com"
          value={company_email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyEmail(e.target.value)}
        />
      </RowContainer>
      <RowContainer>
        <InputWithLabel
          label="Tel. Number"
          containerClassName="grow"
          id="telephone_number"
          placeholder="Enter your telephone number"
          value={telephone_number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelephoneNumber(e.target.value)}
        />

        <InputWithLabel
          containerClassName="grow"
          label="Phone Number"
          id="phone_number"
          placeholder="Enter your phone number"
          value={phone_number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
        />
      </RowContainer>

      <RowContainer>
        <InputWithLabel
          label="Website"
          containerClassName="grow"
          id="website"
          placeholder="companywebsite.com"
          value={website}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
        />

        <InputWithLabel
          label="Facebook Page"
          containerClassName="grow"
          id="facebook_page"
          placeholder="facebook.com/companypage"
          value={facebook_page}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFacebookPage(e.target.value)}
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
