import SearchSkill from "@/components/common/input/SearchSkill";
import SkipStep from "@/components/page_specific/onboarding/SkipStep";
import StepContainer from "@/components/page_specific/onboarding/StepContainer";
import { Button } from "@/components/ui/button";
import { useUpdateUserSkills } from "@/hooks/query/useSkills";
import { formatZodError } from "@/lib/utils";
import { updateSkillSchema } from "@/schema/skill";
import useApplicantProfileStore from "@/store/onboarding/applicant.onboarding.store";
import useOnboardingStore from "@/store/onboarding/shared.onboarding.store";

import { useSession } from "next-auth/react";

const MAXIMUM_SKILLS = parseInt(
  process.env.NEXT_PUBLIC_MAXIMUM_SKILLS as string
);

export default function Step4() {
  const session = useSession();
  const skills = useApplicantProfileStore((state) => state.skills);
  const setSkills = useApplicantProfileStore((state) => state.setSkills);
  const setError = useOnboardingStore.getState().setError;

  console.log(skills)
  const { mutate, isPending } = useUpdateUserSkills(
    session?.data?.user?.user_id
  );

  function handleNextStep() {
    setError(null);

    const current_skills = useApplicantProfileStore.getState().skills;
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
  // Handle both cases: array of Skill objects OR array of strings (from API after split)
  const selectedSkillNames = skills
    .map((skill) => {
      // If skill is already a string, return it
      if (typeof skill === "string") return skill;
      // If skill is an object with skill_name, return that
      return skill?.skill_name;
    })
    .filter((name): name is string => typeof name === "string" && name.length > 0);

  // Handle skill changes from the new SearchSkill component
  function handleSkillsChange(skillNames: string[]) {
    // Convert skill names back to skill objects
    // We need to preserve skill_id for existing skills and create new ones for new skills
    const updatedSkills = skillNames.map((name) => {
      const existingSkill = skills.find((s) => {
        // Handle both string and object format
        if (typeof s === "string") return s === name;
        return s.skill_name === name;
      });
      
      if (existingSkill) {
        // If existing skill is a string, convert it to object format
        if (typeof existingSkill === "string") {
          return {
            skill_id: 0,
            skill_name: existingSkill,
          };
        }
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
