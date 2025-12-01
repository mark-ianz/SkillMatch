"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SearchJobCategory from "@/components/common/input/SearchJobCategory";
import SearchSkill from "@/components/common/input/SearchSkill";
import { JobPost } from "@/types/job_post.types";
import SelectWithLabel from "@/components/common/input/SelectWithLabel";
import { getAllCourses } from "@/lib/utils";
import { ItemList } from "@/components/common/input/ComboBox";
import { toast } from "sonner";

type Props = {
  formData: Partial<JobPost>;
  courseInput: string;
  setCoursesInput: (v: string) => void;
  addCourses: () => void;
  removeCourses: (index: number) => void;
  updateField: <K extends keyof JobPost>(field: K, value: JobPost[K]) => void;
};

export default function RequirementsSection({
  formData,
  courseInput,
  setCoursesInput,
  addCourses,
  removeCourses,
  updateField,
}: Props) {
  const COURSES = getAllCourses(true) as ItemList[];
  const [selectedCourse, setSelectedCourse] = React.useState<ItemList | null>(
    null
  );

  useEffect(() => {
    if (!selectedCourse) {
      setCoursesInput(COURSES[0].value);
    }
  }, [COURSES, setCoursesInput, selectedCourse]);

  function handleAddCourses() {
    if (!formData.courses_required?.includes(courseInput)) {
      addCourses();
      return;
    }

    toast.error("Course already added", {
      style: { backgroundColor: "#fee2e2", color: "#b91c1c" },
    });
  }

  console.log(courseInput);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
        <CardDescription>Courses, skills, and qualifications</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex gap-2 items-end">
            <SelectWithLabel
              required={true}
              containerClassName="w-full"
              id="course"
              label="Course"
              value={selectedCourse?.value || ""}
              onChange={(value) => {
                const course = COURSES.find((c) => c.value === value);
                setSelectedCourse(course || null);
                setCoursesInput(value);
              }}
              items={COURSES}
            />
            <Button
              type="button"
              onClick={handleAddCourses}
              variant={"default_employer"}
            >
              Add
            </Button>
          </div>

          {formData.courses_required &&
            formData.courses_required.length > 0 && (
              <ul className="space-y-2 mt-3">
                {formData.courses_required?.map((prog, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-2 bg-muted rounded"
                  >
                    <span className="text-sm">{prog}</span>
                    <button
                      type="button"
                      onClick={() => removeCourses(idx)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
        </div>
        <div className="grid gap-2">
          <Label>Job Categories</Label>
          <SearchJobCategory
            selectedCategories={formData.job_categories || []}
            onCategoriesChange={(categories) =>
              updateField("job_categories" as keyof JobPost, categories)
            }
          />
        </div>

        <div className="grid gap-2">
          <Label>Technical Skills</Label>
          <SearchSkill
            selectedSkills={formData.technical_skills}
            onSkillsChange={(skills) =>
              updateField("technical_skills" as keyof JobPost, skills)
            }
            skillType="technical"
          />
        </div>

        <div className="grid gap-2">
          <Label>Soft Skills</Label>
          <SearchSkill
            selectedSkills={formData.soft_skills}
            onSkillsChange={(skills) =>
              updateField("soft_skills" as keyof JobPost, skills)
            }
            skillType="soft"
          />
        </div>
      </CardContent>
    </Card>
  );
}
