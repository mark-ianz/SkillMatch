import { api } from "@/lib/axios";
import { Skill, SkillQuery } from "@/types/skill.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useSearchSkills(q: string) {
  return useQuery({
    queryKey: ["search-skills", q],
    queryFn: async () => {
      const { data } = await api.get<SkillQuery>("/skills/search", {
        params: { q },
      });
      return data;
    },
    enabled: !!q.trim(),
  });
}

export function useUpdateUserSkills(user_id: number | undefined) {
  return useMutation({
    mutationKey: ["update-user-skills", user_id],
    mutationFn: async (skills: Skill[]) => {
      await api.post(`/skills/update/${user_id}`, { skills });
    },
  });
}