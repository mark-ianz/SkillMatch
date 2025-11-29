"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import SelectWithLabel from "@/components/common/input/SelectWithLabel";
import { addYears } from "date-fns";
import { toast } from "sonner";
import useSettingsStore from "@/store/SettingsStore";
import { useUpdateEducation } from "@/hooks/query/useUserSettings";
import college_courses from "@/data/college_courses.json";

export default function EducationTab() {
  const education = useSettingsStore((state) => state.education);
  const setEducation = useSettingsStore((state) => state.setEducation);

  const updateEducationMutation = useUpdateEducation();

  const handleUpdateEducation = () => {
    if (!education.student_number || !education.college || !education.course || !education.expected_graduation_year) {
      toast.error("Please fill in all education fields");
      return;
    }

    updateEducationMutation.mutate(education);
  };

  const college_list = (Object.keys(college_courses) as Array<keyof typeof college_courses>).map((college) => ({
    value: college,
    label: college,
  }));

  const course_list = education.college
    ? (college_courses[education.college as keyof typeof college_courses]?.courses || []).map((course: { course_name: string; abbr: string }) => ({
        label: course.course_name,
        value: course.abbr,
      }))
    : [];

  const currentYear = new Date().getFullYear();
  const graduation_years = [
    { label: currentYear.toString(), value: currentYear.toString() },
    {
      label: addYears(new Date(), 1).getFullYear().toString(),
      value: addYears(new Date(), 1).getFullYear().toString(),
    },
    {
      label: addYears(new Date(), 2).getFullYear().toString(),
      value: addYears(new Date(), 2).getFullYear().toString(),
    },
  ];
  return (
    <TabsContent value="education">
      <Card>
        <CardHeader>
          <CardTitle>Education Details</CardTitle>
          <CardDescription>
            Update your educational information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student_number">Student Number</Label>
              <Input
                id="student_number"
                value={education.student_number}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    student_number: e.target.value,
                  })
                }
              />
            </div>
            <SelectWithLabel
              required={true}
              containerClassName="w-full"
              id="college"
              label="College"
              value={education.college || college_list[0]?.value || ""}
              onChange={(value) =>
                setEducation({ ...education, college: value })
              }
              items={college_list}
            />
            <SelectWithLabel
              disabled={!education.college}
              required={true}
              containerClassName="w-full"
              id="course"
              label="Course"
              value={education.course || course_list[0]?.value || ""}
              onChange={(value) =>
                setEducation({ ...education, course: value })
              }
              items={course_list}
            />
            <SelectWithLabel
              required={true}
              containerClassName="w-full"
              id="year_level"
              label="Year Level"
              value={education.year_level || ""}
              onChange={(value) =>
                setEducation({
                  ...education,
                  year_level: value as "3rd year" | "4th year",
                })
              }
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
              value={education.expected_graduation_year || ""}
              onChange={(value) =>
                setEducation({
                  ...education,
                  expected_graduation_year: value,
                })
              }
              items={graduation_years}
            />
          </div>

          <Button 
            onClick={handleUpdateEducation}
            disabled={updateEducationMutation.isPending}
          >
            {updateEducationMutation.isPending ? "Saving..." : "Save Education Details"}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
