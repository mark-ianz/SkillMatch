import { db } from "@/lib/db";
import { Skill } from "@/types/skill.types";
import { RowDataPacket } from "mysql2";

export const SkillServices = {
  searchSkill: async (query: string) => {
    const [rows] = await db.query<(Skill & RowDataPacket)[]>(
      `SELECT * FROM skill WHERE skill_name LIKE ? LIMIT 10`,
      [`${query}%`]
    );
    return rows;
  },
  updateSkills: async (user_id: string, skills: Skill[]) => {
    // create connection
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // delete all previous skills
      await db.query(`DELETE FROM ojt_skill WHERE user_id = ?`, [user_id]);

      const values = skills.map((skill) => [user_id, skill.skill_id]);

      await db.query(`INSERT INTO ojt_skill (user_id, skill_id) VALUES ?`, [
        values,
      ]);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  getUserSkills: async (user_id: string | number) => {
    const [rows] = await db.query<(RowDataPacket & { skill_id: number })[]>(
      `SELECT ojt_skill.skill_id FROM ojt_skill WHERE ojt_skill.user_id = ?`,
      [user_id]
    );
    const skill_ids = rows.map((row) => row.skill_id);

    const [skillRows] = await db.query(
      `SELECT * FROM skill WHERE skill_id IN (?)`,
      [skill_ids]
    );

    return skillRows as Skill[];
  },
};
