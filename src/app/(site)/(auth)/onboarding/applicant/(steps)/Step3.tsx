import RowContainer from "@/components/common/input/RowContainer";
import SelectWithLabel from "@/components/common/input/SelectWithLabel";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import React from "react";
import college_courses from "@/data/college_courses.json";
import { addYears } from "date-fns";
import { Button } from "@/components/ui/button";
import { useUpdateStepThreeOnboardingApplicant } from "@/hooks/query/useOnboardingApplicant";
import { useSession } from "next-auth/react";
import { onboardingStepThreeSchema } from "@/schema/onboarding";
import { ZodError } from "zod";
import { formatZodError } from "@/lib/utils";
import useApplicantProfileStore from "@/store/onboarding/applicant.onboarding.store";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";
import InputWithLabel from "@/components/common/input/InputWithLabel";

export default function Step3() {
  const session = useSession();
  const { mutate, isPending } = useUpdateStepThreeOnboardingApplicant(
    session.data?.user.user_id
  );

  const student_number = useApplicantProfileStore((state) => state.student_number);
  const college = useApplicantProfileStore((state) => state.college);
  const course = useApplicantProfileStore((state) => state.course);
  const year_level = useApplicantProfileStore((state) => state.year_level);
  const expected_graduation_year = useApplicantProfileStore(
    (state) => state.expected_graduation_year
  );
  const preferred_schedule = useApplicantProfileStore((state) => state.preferred_schedule);
  const required_hours = useApplicantProfileStore((state) => state.required_hours);

  const setStudentNumber = useApplicantProfileStore((state) => state.setStudentNumber);
  const setCollege = useApplicantProfileStore((state) => state.setCollege);
  const setCourse = useApplicantProfileStore((state) => state.setCourse);
  const setYearLevel = useApplicantProfileStore((state) => state.setYearLevel);
  const setExpectedGraduationYear = useApplicantProfileStore(
    (state) => state.setExpectedGraduationYear
  );
  const setPreferredSchedule = useApplicantProfileStore((state) => state.setPreferredSchedule);
  const setRequiredHours = useApplicantProfileStore((state) => state.setRequiredHours);
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
        student_number: student_number || "",
        college: college || "",
        course: course || "",
        year_level: year_level || "",
        expected_graduation_year: expected_graduation_year || "",
        preferred_schedule: preferred_schedule || "",
        required_hours: required_hours || "",
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

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleDay = (day: string) => {
    const currentDays = preferred_schedule ? preferred_schedule.split(",") : [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];
    setPreferredSchedule(newDays.join(","));
  };
  
  return (
    <StepContainer>
      <RowContainer>
        <InputWithLabel
          value={student_number || ""}
          required={true}
          placeholder="e.g., 2023-10345"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStudentNumber(e.target.value)
          }
          label="Student Number"
          containerClassName="w-full"
        />
      </RowContainer>
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
      <RowContainer>
        <div className="w-full">
          <label className="text-sm font-medium mb-2 block">
            Available Days <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {weekDays.map((day) => {
              const selectedDays = preferred_schedule ? preferred_schedule.split(",") : [];
              return (
                <label
                  key={day}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(day)}
                    onChange={() => toggleDay(day)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">{day}</span>
                </label>
              );
            })}
          </div>
        </div>
      </RowContainer>
      <RowContainer>
        <InputWithLabel
          value={required_hours || ""}
          required={true}
          type="number"
          placeholder="e.g., 300"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRequiredHours(Number(e.target.value))
          }
          label="Required OJT Hours"
          containerClassName="w-full"
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
