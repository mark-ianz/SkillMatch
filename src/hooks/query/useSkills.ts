import { api } from "@/lib/axios";
import useSignupStore from "@/store/SignupStore";
import { Skill, SkillQuery } from "@/types/skill.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useSearchSkills(q: string) {
  return useQuery({
    queryKey: ["search-skills", q],
    queryFn: async () => {
      const { data } = await api.get<SkillQuery>("/ojt/skills/search", {
        params: { q },
      });
      return data;
    },
    enabled: !!q.trim(),
  });
}

export function useUpdateUserSkills(user_id: number | undefined) {
  const nextStep = useSignupStore((state) => state.nextStep);

  return useMutation({
    mutationKey: ["update-user-skills", user_id],
    mutationFn: async (skills: Skill[]) => {
      await api.post(`/ojt/skills/${user_id}`, { skills });
    },
    onSuccess: () => {
      // increment the step on the store
      nextStep();
    },
  });
}
