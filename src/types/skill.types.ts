export type Skill = {
  skill_id: number;
  skill_name: string;
};

export type SkillQuery = {
  skills: Skill[]
}