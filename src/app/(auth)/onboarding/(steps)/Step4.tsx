import SearchSkill from "@/components/common/input/SearchSkill";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { Button } from "@/components/ui/button";
import { useUpdateUserSkills } from "@/hooks/query/useSkills";
import { formatZodError } from "@/lib/utils";
import { updateSkillSchema } from "@/schema/skill";
import useSignupStore from "@/store/SignupStore";

import { Skill } from "@/types/skill.types";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";

const MAXIMUM_SKILLS = parseInt(
  process.env.NEXT_PUBLIC_MAXIMUM_SKILLS as string
);

export default function Step4() {
  const session = useSession();
  const total_skills = useSignupStore((state) => state.skills.length);

  const { mutate, isPending } = useUpdateUserSkills(
    session?.data?.user?.user_id
  );

  function handleNextStep() {
    const skills_store = useSignupStore.getState().skills;
    console.log(skills_store)
    const { data, success, error } = updateSkillSchema.safeParse(skills_store);
    const setError = useSignupStore.getState().setError;

    if (!success) {
      setError(formatZodError(error));
    }

    if (data) {
      mutate(data);
    }
  }

  return (
    <StepContainer>
      <div className="flex flex-col gap-4 border rounded-md shadow-sm p-4 ">
        <SearchSkill />
        <RenderSkills />
        <p className="text-xs text-skillmatch-secondary-dark/50 mt-4">
          Maximum of {MAXIMUM_SKILLS} skills. {total_skills}/{MAXIMUM_SKILLS}
        </p>
      </div>
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

function RenderSkills() {
  const skills = useSignupStore((state) => state.skills);
  return (
    skills.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillList key={skill.skill_id} skill={skill} />
        ))}
      </div>
    )
  );
}

function SkillList({ skill }: { skill: Skill }) {
  const removeSkill = useSignupStore((state) => state.removeSkill);
  const skills = useSignupStore((state) => state.skills);

  function handleRemoveSkill() {
    removeSkill(skill.skill_id);
    console.log(skills);
  }

  return (
    <div className="flex gap-4 items-center justify-center text-sm text-center border py-1 pl-4 pr-2 rounded-md border-skillmatch-primary-green text-skillmatch-primary-green">
      <p>{skill.skill_name}</p>
      <div
        className="hover:bg-accent p-1 rounded-full cursor-pointer w-fit ml-auto"
        onClick={handleRemoveSkill}
      >
        <X className="w-4 h-4 text-skillmatch-muted-green" />
      </div>
    </div>
  );
}
