import { db } from "@/lib/db";
import { Skill } from "@/types/skill.types";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const SkillServices = {
  searchSkill: async (query: string, type: "soft" | "technical" = "technical") => {
    const table = type === "soft" ? "soft_skill" : "skill";
    const [rows] = await db.query<(Skill & RowDataPacket)[]>(
      `SELECT * FROM ${table} WHERE skill_name LIKE ? LIMIT 10`,
      [`${query}%`]
    );
    return rows;
  },
  createSkill: async (skill_name: string, type: "soft" | "technical" = "technical") => {
    const table = type === "soft" ? "soft_skill" : "skill";
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO ${table} (skill_name) VALUES (?)`,
        [skill_name]
      );
      await connection.commit();
      const insertId = result.insertId;
      const [rows] = await db.query<(Skill & RowDataPacket)[]>(
        `SELECT * FROM ${table} WHERE skill_id = ?`,
        [insertId]
      );
      return rows[0] as Skill;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  updateSkills: async (user_id: string, skills: Skill[]) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Convert skills array to comma-separated string
      const skillsString = skills.map((skill) => skill.skill_name).join(", ");

      // Update the skills column in applicant_profile
      await connection.query(
        `UPDATE applicant_profile SET skills = ? WHERE user_id = ?`,
        [skillsString, user_id]
      );

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  getUserSkills: async (user_id: string | number) => {
    const [rows] = await db.query<(RowDataPacket & { skills: string | null })[]>(
      `SELECT skills FROM applicant_profile WHERE user_id = ?`,
      [user_id]
    );

    if (rows.length === 0 || !rows[0].skills) {
      return [];
    }

    // Split comma-separated string into array and trim whitespace
    const skillNames = rows[0].skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    return skillNames;
  },
};
