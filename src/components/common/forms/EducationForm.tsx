"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectWithLabel from "@/components/common/input/SelectWithLabel";
import college_courses from "@/data/college_courses.json";
import { addYears } from "date-fns";

export type EducationFormData = {
  student_number: string;
  college: string;
  course: string;
  year_level: "3rd year" | "4th year";
  expected_graduation_year: string;
};

type EducationFormProps = {
  data: EducationFormData;
  onChange: (data: EducationFormData) => void;
  useCustomSelects?: boolean; // For onboarding, use true; for settings, use false
};

export default function EducationForm({
  data,
  onChange,
  useCustomSelects = false,
}: EducationFormProps) {
  const handleChange = (field: keyof EducationFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const college_list = Object.keys(college_courses).map((college) => ({
    value: college,
    label: college,
  }));

  const course_list = data.college
    ? college_courses[data.college as keyof typeof college_courses].courses.map(
        (course) => ({ value: course.abbr, label: course.course_name })
      )
    : [];

  const graduation_years = [
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
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="student_number">Student Number</Label>
          <Input
            id="student_number"
            value={data.student_number}
            onChange={(e) => handleChange("student_number", e.target.value)}
            required
          />
        </div>
        {useCustomSelects ? (
          <SelectWithLabel
            required
            containerClassName="w-full"
            id="college"
            label="College"
            value={data.college || college_list[0]?.value || ""}
            onChange={(value) => handleChange("college", value)}
            items={college_list}
          />
        ) : (
          <div>
            <Label htmlFor="college">College</Label>
            <Input
              id="college"
              value={data.college}
              onChange={(e) => handleChange("college", e.target.value)}
              required
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {useCustomSelects ? (
          <SelectWithLabel
            disabled={!data.college}
            required
            containerClassName="w-full"
            id="course"
            label="Course"
            value={data.course || course_list[0]?.value || ""}
            onChange={(value) => handleChange("course", value)}
            items={course_list}
          />
        ) : (
          <div>
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={data.course}
              onChange={(e) => handleChange("course", e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <Label htmlFor="year_level">Year Level</Label>
          {useCustomSelects ? (
            <SelectWithLabel
              required
              containerClassName="w-full"
              id="year_level"
              label=""
              value={data.year_level || ""}
              onChange={(value) => handleChange("year_level", value)}
              items={[
                { value: "3rd year", label: "3rd year" },
                { value: "4th year", label: "4th year" },
              ]}
            />
          ) : (
            <select
              id="year_level"
              value={data.year_level}
              onChange={(e) =>
                handleChange("year_level", e.target.value as "3rd year" | "4th year")
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="3rd year">3rd Year</option>
              <option value="4th year">4th Year</option>
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="graduation_year">Expected Graduation Year</Label>
          {useCustomSelects ? (
            <SelectWithLabel
              required
              containerClassName="w-full"
              id="expected_graduation_year"
              label=""
              value={data.expected_graduation_year || ""}
              onChange={(value) => handleChange("expected_graduation_year", value)}
              items={graduation_years}
            />
          ) : (
            <Input
              id="graduation_year"
              type="number"
              min={new Date().getFullYear()}
              value={data.expected_graduation_year}
              onChange={(e) => handleChange("expected_graduation_year", e.target.value)}
              required
            />
          )}
        </div>
      </div>
    </div>
  );
}
