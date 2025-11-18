"use client";

import React from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import InputWithLabel from "@/components/common/input/InputWithLabel";
import useCompanyStore from "@/store/onboarding/company.onboarding.store";
import { Button } from "@/components/ui/button";
import RowContainer from "@/components/common/input/RowContainer";
import { employerOnboardingStepThreeSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";
import { formatZodError } from "@/lib/utils";
import { useUpdateStepThreeOnboardingCompany } from "@/hooks/query/useOnboardingCompany";
import { useSession } from "next-auth/react";

export default function Step3() {
  const session = useSession();
  const { mutate, isPending } = useUpdateStepThreeOnboardingCompany(session.data?.user.company_id);

  const website = useCompanyStore((s) => s.website || "");
  const facebook_page = useCompanyStore((s) => s.facebook_page || "");
  const instagram_page = useCompanyStore((s) => s.instagram_page || "");
  const twitter_page = useCompanyStore((s) => s.twitter_page || "");

  const setWebsite = useCompanyStore((s) => s.setWebsite);
  const setFacebookPage = useCompanyStore((s) => s.setFacebookPage);
  const setInstagramPage = useCompanyStore((s) => s.setInstagramPage);
  const setTwitterPage = useCompanyStore((s) => s.setTwitterPage);

  const setError = useOnboardingStore((state) => state.setError);

  function handleNext() {
    try {
      // clear previous errors
      setError(null);

      // get snapshot of all fields
      const data = {
        website: useCompanyStore.getState().website,
        facebook_page: useCompanyStore.getState().facebook_page,
        instagram_page: useCompanyStore.getState().instagram_page,
        twitter_page: useCompanyStore.getState().twitter_page,
      };
      const parsed = employerOnboardingStepThreeSchema.parse(data);

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
          label="Website"
          containerClassName="grow"
          id="website"
          type="url"
          placeholder="https://www.companywebsite.com"
          value={website}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
          optional
        />

        <InputWithLabel
          label="Facebook Page"
          containerClassName="grow"
          id="facebook_page"
          type="url"
          placeholder="https://facebook.com/companypage"
          value={facebook_page}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFacebookPage(e.target.value)}
          optional
        />
      </RowContainer>

      <RowContainer>
        <InputWithLabel
          label="Instagram Page"
          containerClassName="grow"
          id="instagram_page"
          type="url"
          placeholder="https://instagram.com/company"
          value={instagram_page}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInstagramPage(e.target.value)}
          optional
        />

        <InputWithLabel
          label="Twitter Page"
          containerClassName="grow"
          id="twitter_page"
          type="url"
          placeholder="https://twitter.com/company"
          value={twitter_page}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTwitterPage(e.target.value)}
          optional
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
