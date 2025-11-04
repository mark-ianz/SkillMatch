import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSkillClient } from "@/services/skill.client";
import { Skill } from "@/types/skill.types";
import { toast } from "sonner";

type CreateSkillVars = { skill_name: string; type?: "soft" | "technical" };

export function useCreateSkill() {
  const qc = useQueryClient();

  return useMutation<Skill, unknown, CreateSkillVars>({
    mutationFn: ({ skill_name, type = "technical" }) =>
      createSkillClient(skill_name, type),
    onMutate: async () => {
      // cancel outgoing refetches for search-skills
      await qc.cancelQueries({ predicate: (q) => q.queryKey[0] === "search-skills" });
      // snapshot existing queries
      const previous = qc.getQueriesData({ predicate: (q) => q.queryKey[0] === "search-skills" });
      return { previous };
    },
    onError: () => {
      toast.error("Failed to create skill");
      // no restore for now; we'll invalidate onSettled
    },
    onSuccess: (created) => {
      // update all cached search results by prepending created skill if not present
      const queries = qc.getQueriesData({ predicate: (q) => q.queryKey[0] === "search-skills" });
      queries.forEach(([queryKey]) => {
        try {
          qc.setQueryData(queryKey, (old: unknown) => {
            const o = old as { skills?: Skill[] } | undefined;
            const skills = o?.skills || [];
            if (skills.find((s) => s.skill_id === created.skill_id)) return old;
            return { ...(o || {}), skills: [created, ...skills] };
          });
        } catch {
          // ignore individual failures
        }
      });

      toast.success("Skill created");
    },
    onSettled: () => {
      qc.invalidateQueries({ predicate: (q) => q.queryKey[0] === "search-skills" });
    },
  });
}

export default useCreateSkill;
