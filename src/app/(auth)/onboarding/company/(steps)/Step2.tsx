"use client";

import React from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import InputWithLabel from "@/components/common/input/InputWithLabel";
import useCompanyStore from "@/store/CompanyStore";
import { Button } from "@/components/ui/button";
import { employerOnboardingStepTwoSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import useOnboardingStore from "@/store/OnboardingStore";
import { formatZodError, getAllIndustry } from "@/lib/utils";
import { useUpdateStepTwoOnboardingCompany } from "@/hooks/query/useOnboardingCompany";
import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export default function Step2() {
  const session = useSession();
  const { mutate, isPending } = useUpdateStepTwoOnboardingCompany(session.data?.user.company_id);

  const about_company = useCompanyStore((s) => s.about_company || "");
  const industry = useCompanyStore((s) => s.industry || []);
  const company_image = useCompanyStore((s) => s.company_image || "");

  const setAboutCompany = useCompanyStore((s) => s.setAboutCompany);
  const setIndustry = useCompanyStore((s) => s.setIndustry);
  const setCompanyImage = useCompanyStore((s) => s.setCompanyImage);

  const setError = useOnboardingStore((state) => state.setError);

  const INDUSTRIES = getAllIndustry() as string[];

  const handleIndustryChange = (value: string) => {
    const currentIndustry = [...industry];
    const index = currentIndustry.indexOf(value);
    
    if (index > -1) {
      currentIndustry.splice(index, 1);
    } else {
      currentIndustry.push(value);
    }
    
    setIndustry(currentIndustry);
  };

  function handleNext() {
    try {
      // clear previous errors
      setError(null);

      // get snapshot of all fields
      const data = {
        about_company: useCompanyStore.getState().about_company,
        industry: useCompanyStore.getState().industry || [],
        company_image: useCompanyStore.getState().company_image || "",
      };
      const parsed = employerOnboardingStepTwoSchema.parse(data);

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
      <InputWithLabel
        label="About Company"
        id="about_company"
        as="textarea"
        placeholder="Tell us about your company, what you do, and what makes you unique..."
        value={about_company}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAboutCompany(e.target.value)}
        rows={6}
        required
      />

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">
          Industry <span className="text-red-500">*</span>
        </Label>
        <Card className="p-4">
          <ScrollArea className="h-[200px]">
            <div className="space-y-3">
              {INDUSTRIES.map((ind) => (
                <div key={ind} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${ind}`}
                    checked={industry.includes(ind)}
                    onCheckedChange={() => handleIndustryChange(ind)}
                  />
                  <label
                    htmlFor={`industry-${ind}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {ind}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">
          Company Image <span className="text-muted-foreground text-xs">(Optional - defaults to Google profile picture)</span>
        </Label>
        <InputWithLabel
          label=""
          id="company_image"
          type="url"
          placeholder="https://example.com/logo.png"
          value={company_image}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyImage(e.target.value)}
        />
      </div>

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
