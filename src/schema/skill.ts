import z from "zod";

export const updateSkillSchema = z
  .array(
    z.object({
      skill_id: z.number().int().nonnegative(),
      skill_name: z.string().min(2).max(100),
    })
  )
  .min(1, { error: "At least one skill is required" });

export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
