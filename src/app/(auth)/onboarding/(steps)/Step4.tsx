import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

export default function Step4() {
  const dummySkills = [
    {
      skill_id: 1,
      skill: "HTML",
    },
    {
      skill_id: 2,
      skill: "CSS",
    },
    {
      skill_id: 3,
      skill: "JavaScript",
    },
    {
      skill_id: 4,
      skill: "React",
    },
    {
      skill_id: 5,
      skill: "NodeJS",
    },
    {
      skill_id: 6,
      skill: "TypeScript",
    },
    {
      skill_id: 7,
      skill: "Python",
    },
    {
      skill_id: 8,
      skill: "Ruby",
    },
    {
      skill_id: 9,
      skill: "PHP",
    },
    {
      skill_id: 10,
      skill: "Go",
    },
    {
      skill_id: 11,
      skill: "Swift",
    },
    {
      skill_id: 12,
      skill: "Kotlin",
    },
    {
      skill_id: 13,
      skill: "Dart",
    },
    {
      skill_id: 14,
      skill: "Scala",
    },
    {
      skill_id: 15,
      skill: "Elixir",
    },
  ];

  return (
    <StepContainer>
      <div className="flex flex-col gap-4">
        <div className="border rounded-md shadow-sm p-4 grid grid-cols-4 gap-4">
          {dummySkills.map(({ skill_id, skill }) => (
            <Skill key={skill_id + skill} skill={skill} />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant={"ghost"}
            className="w-fit text-skillmatch-primary-green"
          >
            Add a new skill
          </Button>
        </div>
      </div>
      <Button
        /* disabled={isPending}
        onClick={handleNextStep} */
        type="button"
        className="ml-auto w-24"
      >
        Next
      </Button>
    </StepContainer>
  );
}

function Skill({ skill }: { skill: string }) {
  return (
    <div className="flex items-center justify-center gap-1 w-fit">
      <div className="text-sm text-center border min-w-[125px] py-1 px-4 rounded-md border-skillmatch-primary-green text-skillmatch-primary-green">
        {skill}
      </div>
      <div className="hover:bg-accent p-2 rounded-full cursor-pointer">
        <X className="w-4 h-4 text-skillmatch-muted-green" />
      </div>
    </div>
  );
}
