import SearchSkill from "@/components/common/input/SearchSkill";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { Button } from "@/components/ui/button";
import useSignupStore from "@/store/SignupStore";

import { Skill } from "@/types/skill.types";
import { X } from "lucide-react";

export default function Step4() {
  const skills = useSignupStore((state) => state.skills);

  return (
    <StepContainer>
      <div className="flex flex-col gap-4 border rounded-md shadow-sm p-4 ">
        <SearchSkill />

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillList key={skill.skill_id} skill={skill} />
          ))}
        </div>
        <p className="text-xs text-skillmatch-secondary-dark/50 mt-4">
          Maximum of 15 skills. 0/15
        </p>
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

function SkillList({ skill }: { skill: Skill }) {
  return (
    <div className="flex gap-4 items-center justify-center text-sm text-center border py-1 pl-4 pr-2 rounded-md border-skillmatch-primary-green text-skillmatch-primary-green">
      <p>{skill.skill_name}</p>
      <div className="hover:bg-accent p-1 rounded-full cursor-pointer w-fit ml-auto">
        <X className="w-4 h-4 text-skillmatch-muted-green" />
      </div>
    </div>
  );
}
