"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchJobCategory from "@/components/common/input/SearchJobCategory";
import SearchSkill from "@/components/common/input/SearchSkill";
import { JobPost } from "@/types/job_post.types";

type Props = {
  formData: Partial<JobPost>;
  programInput: string;
  setProgramInput: (v: string) => void;
  addProgram: () => void;
  removeProgram: (index: number) => void;
  updateField: <K extends keyof JobPost>(field: K, value: JobPost[K]) => void;
};

export default function RequirementsSection({ formData, programInput, setProgramInput, addProgram, removeProgram, updateField }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
        <CardDescription>
          Programs, skills, and qualifications
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label>Program Required</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Bachelor of Science in Computer Science"
              value={programInput}
              onChange={(e) => setProgramInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addProgram();
                }
              }}
            />
            <Button type="button" onClick={addProgram} variant={"default_employer"}>
              Add
            </Button>
          </div>
          <ul className="space-y-2 mt-3">
            {formData.program_required?.map((prog, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2 bg-muted rounded"
              >
                <span className="text-sm">{prog}</span>
                <button
                  type="button"
                  onClick={() => removeProgram(idx)}
                  className="text-destructive hover:text-destructive/80"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-2">
          <Label>Job Categories</Label>
          <SearchJobCategory
            selectedCategories={formData.job_category || []}
            onCategoriesChange={(categories) =>
              updateField("job_category" as keyof JobPost, categories)
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
