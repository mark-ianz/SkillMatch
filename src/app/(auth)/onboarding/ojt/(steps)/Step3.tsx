import RowContainer from "@/components/common/input/RowContainer";
import SelectWithLabel from "@/components/common/input/SelectWithLabel";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import React from "react";
import college_courses from "@/data/college_courses.json";
import { addYears } from "date-fns";
import { Button } from "@/components/ui/button";
import { useUpdateStepThreeOnboardingOJT } from "@/hooks/query/useOnboardingOJT";
import { useSession } from "next-auth/react";
import { onboardingStepThreeSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import { formatZodError } from "@/lib/utils";
import useOJTProfileStore from "@/store/OJTProfileStore";
import useOnboardingStore from "@/store/OnboardingStore";

export default function Step3() {
  const session = useSession();
  const { mutate, isPending } = useUpdateStepThreeOnboardingOJT(
    session.data?.user.user_id
  );

  const college = useOJTProfileStore((state) => state.college);
  const course = useOJTProfileStore((state) => state.course);
  const year_level = useOJTProfileStore((state) => state.year_level);
  const expected_graduation_year = useOJTProfileStore(
    (state) => state.expected_graduation_year
  );

  const setCollege = useOJTProfileStore((state) => state.setCollege);
  const setCourse = useOJTProfileStore((state) => state.setCourse);
  const setYearLevel = useOJTProfileStore((state) => state.setYearLevel);
  const setExpectedGraduationYear = useOJTProfileStore(
    (state) => state.setExpectedGraduationYear
  );
  const setError = useOnboardingStore((state) => state.setError);

  const college_list = Object.keys(college_courses).map((college) => ({
    value: college,
    label: college,
  }));

  const course_list = college
    ? college_courses[college as keyof typeof college_courses].courses.map(
        (course) => ({ value: course.abbr, label: course.course_name })
      )
    : [];

  // Submit handler
  async function handleNextStep() {
    // validate the data
    try {
      // clear previous errors
      setError(null);

      const toParse = {
        college: college || "",
        course: course || "",
        year_level: year_level || "",
        expected_graduation_year: expected_graduation_year || "",
      }

      const parsed = onboardingStepThreeSchema.parse(toParse);


      // update the user info on the backend
      mutate(parsed);
    } catch (error) {
      console.log(error)
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
        <SelectWithLabel
          required={true}
          containerClassName="w-full"
          id="college"
          label="College"
          value={college || college_list[0]?.value || ""}
          onChange={setCollege as (college: string) => void}
          items={college_list}
        />
      </RowContainer>
      <RowContainer>
        <SelectWithLabel
          disabled={!college}
          required={true}
          containerClassName="w-full"
          id="course"
          label="Course"
          value={course || course_list[0]?.value || ""}
          onChange={setCourse as (course: string) => void}
          items={course_list}
        />
      </RowContainer>
      <RowContainer>
        <SelectWithLabel
          required={true}
          containerClassName="w-full"
          id="year_level"
          label="Year Level"
          value={year_level || ""}
          onChange={setYearLevel as (year_level: string) => void}
          items={[
            { value: "3rd year", label: "3rd year" },
            { value: "4th year", label: "4th year" },
          ]}
        />
        <SelectWithLabel
          required={true}
          containerClassName="w-full"
          id="expected_graduation_year"
          label="Expected Graduation Year"
          value={expected_graduation_year || ""}
          onChange={
            setExpectedGraduationYear as (
              expected_graduation_year: string
            ) => void
          }
          items={[
            {
              value: new Date().getFullYear().toString(),
              label: new Date().getFullYear().toString(),
            },
            {
              value: addYears(new Date(), 1).getFullYear().toString(),
              label: addYears(new Date(), 1).getFullYear().toString(),
            },
            {
              value: addYears(new Date(), 2).getFullYear().toString(),
              label: addYears(new Date(), 2).getFullYear().toString(),
            },
          ]}
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

// TODO, ERRORS ON SUBMITTING EMPTY SELECT FIELDS