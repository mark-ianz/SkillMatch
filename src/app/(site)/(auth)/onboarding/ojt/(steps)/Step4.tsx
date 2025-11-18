import SearchSkill from "@/components/common/input/SearchSkill";
import SkipStep from "@/components/page_specific/onboarding/SkipStep";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { Button } from "@/components/ui/button";
import { useUpdateUserSkills } from "@/hooks/query/useSkills";
import { formatZodError } from "@/lib/utils";
import { updateSkillSchema } from "@/schema/skill";
import useOJTProfileStore from "@/store/onboarding/ojt.onboarding.store";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";

import { useSession } from "next-auth/react";

const MAXIMUM_SKILLS = parseInt(
  process.env.NEXT_PUBLIC_MAXIMUM_SKILLS as string
);

export default function Step4() {
  const session = useSession();
  const skills = useOJTProfileStore((state) => state.skills);
  const setSkills = useOJTProfileStore((state) => state.setSkills);
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

  // Convert skill objects to skill names for the new SearchSkill component
  const selectedSkillNames = skills.map((skill) => skill.skill_name);

  // Handle skill changes from the new SearchSkill component
  function handleSkillsChange(skillNames: string[]) {
    // Convert skill names back to skill objects
    // We need to preserve skill_id for existing skills and create new ones for new skills
    const updatedSkills = skillNames.map((name) => {
      const existingSkill = skills.find((s) => s.skill_name === name);
      if (existingSkill) {
        return existingSkill;
      }
      // For newly added skills, we'll use a temporary ID
      // The backend will assign proper IDs when saved
      return {
        skill_id: 0, // Temporary ID for new skills
        skill_name: name,
      };
    });
    setSkills(updatedSkills);
  }

  return (
    <StepContainer>
      <div className="flex flex-col gap-4 border rounded-md shadow-sm p-4 ">
        <SearchSkill
          selectedSkills={selectedSkillNames}
          onSkillsChange={handleSkillsChange}
          maxSkills={MAXIMUM_SKILLS}
          skillType="technical"
        />
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
