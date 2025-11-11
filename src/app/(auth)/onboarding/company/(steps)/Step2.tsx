"use client";

import React from "react";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import FileUploadField from "@/components/common/input/FileUploadField";
import useCompanyStore from "@/store/CompanyStore";
import { Button } from "@/components/ui/button";
import { employerOnboardingStepTwoSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import useOnboardingStore from "@/store/OnboardingStore";
import { formatZodError, getAllIndustry } from "@/lib/utils";
import { useUpdateStepTwoOnboardingCompany } from "@/hooks/query/useOnboardingCompany";
import { useUploadCompanyImage } from "@/hooks/query/useDocuments";
import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useRequireCompany from "@/hooks/useRequireCompany";
import { Textarea } from "@/components/ui/textarea";

export default function Step2() {
  const session = useSession();
  const company_id = useRequireCompany();
  const { mutate, isPending } = useUpdateStepTwoOnboardingCompany(
    session.data?.user.company_id
  );

  const { mutateAsync: mutateUploadImage } = useUploadCompanyImage(company_id);

  const description = useCompanyStore((s) => s.description || "");
  const industry = useCompanyStore((s) => s.industry || []);
  const company_image = useCompanyStore((s) => s.company_image || "");

  const setDescription = useCompanyStore((s) => s.setDescription);
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

  async function handleImageUpload(file: File) {
    const { path } = await mutateUploadImage(file);
    setCompanyImage(path);
  }

  function handleNext() {
    try {
      // clear previous errors
      setError(null);

      // get snapshot of all fields
      const data = {
        description: useCompanyStore.getState().description,
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
      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Tell us about your company, what you do, and what makes you unique..."
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          rows={6}
          required
        />
      </div>

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

      <FileUploadField
        id="company_image"
        label="Company Image (Optional - defaults to Google profile picture)"
        accept="image/jpeg,image/png,image/jpg,image/webp"
        currentPath={company_image}
        onUpload={handleImageUpload}
        onClear={() => setCompanyImage("")}
      />

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
