import SearchSkill from "@/components/common/input/SearchSkill_old";
import SkipStep from "@/components/page_specific/onboarding/SkipStep";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { Button } from "@/components/ui/button";
import { useUpdateUserSkills } from "@/hooks/query/useSkills";
import { formatZodError } from "@/lib/utils";
import { updateSkillSchema } from "@/schema/skill";
import useOJTProfileStore from "@/store/OJTProfileStore";
import useOnboardingStore from "@/store/OnboardingStore";

import { Skill } from "@/types/skill.types";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";

const MAXIMUM_SKILLS = parseInt(
  process.env.NEXT_PUBLIC_MAXIMUM_SKILLS as string
);

export default function Step4() {
  const session = useSession();
  const skills = useOJTProfileStore((state) => state.skills);
  const setError = useOnboardingStore.getState().setError;

  const { mutate, isPending } = useUpdateUserSkills(
    session?.data?.user?.user_id
  );

  function handleNextStep() {
    setError(null);

    const current_skills = useOJTProfileStore.getState().skills;
    const { data, success, error } =
      updateSkillSchema.safeParse(current_skills);

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
          Maximum of {MAXIMUM_SKILLS} skills. {skills.length}/{MAXIMUM_SKILLS}
        </p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <SkipStep />
        <Button
          disabled={isPending}
          onClick={handleNextStep}
          type="button"
          className="w-24"
        >
          Next
        </Button>
      </div>
    </StepContainer>
  );
}

function RenderSkills() {
  const skills = useOJTProfileStore((state) => state.skills);
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
  const removeSkill = useOJTProfileStore((state) => state.removeSkill);
  const skills = useOJTProfileStore((state) => state.skills);

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
