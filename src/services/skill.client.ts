import { api } from "@/lib/axios";
import { Skill } from "@/types/skill.types";

export async function createSkillClient(skill_name: string, type: "soft" | "technical" = "technical") {
  const { data } = await api.post<{ skill: Skill }>("/ojt/skills/create", {
    skill_name,
    type,
  });

  return data.skill;
}
