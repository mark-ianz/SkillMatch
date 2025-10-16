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
};
