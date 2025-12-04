import { db } from "@/lib/db";
import { JobPostingFormData } from "@/schema/job-posting.schema";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { nanoid } from "nanoid";
import { getCourseByAbbr } from "@/lib/utils";
import { JobPost } from "@/types/job_post.types";
import { getStatusName } from "@/types/status.types";

export const JobPostingServices = {
  getAllJobPosts: async () => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          jp.*,
          c.company_name,
          c.company_image,
          c.website,
          c.facebook_page,
          c.company_email
        FROM job_posts jp
        LEFT JOIN company c ON jp.company_id = c.company_id
        ORDER BY jp.created_at DESC`
      );

      // Normalize CSV fields to arrays
      return rows.map((row) => ({
        ...row,
        job_post_status: row.job_post_status_id
          ? getStatusName(row.job_post_status_id)
          : undefined,
        job_responsibilities: row.job_responsibilities
          ? row.job_responsibilities.split(",")
          : [],
        courses_required: row.courses_required
          ? row.courses_required.split(",")
          : [],
        job_categories: row.job_categories
          ? row.job_categories.split(" / ")
          : [],
        soft_skills: row.soft_skills ? row.soft_skills.split(",") : [],
        technical_skills: row.technical_skills
          ? row.technical_skills.split(",")
          : [],
      }));
    } catch (error) {
      console.error("Failed to fetch job posts:", error);
      throw error;
    }
  },

  createJobPost: async (data: JobPostingFormData, company_id: string) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const {
        job_title,
        courses_required,
        job_categories,
        available_positions,
        job_overview,
        job_responsibilities,
        preferred_qualifications,
        work_arrangement,
        soft_skills,
        technical_skills,
        street_name,
        barangay,
        city_municipality,
        postal_code,
      } = data;

      const job_post_id = nanoid();

      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO job_posts (job_post_id, company_id, job_title, courses_required, job_categories, available_positions, job_post_status_id, job_overview, job_responsibilities, preferred_qualifications, work_arrangement, soft_skills, technical_skills, street_name, barangay, city_municipality, postal_code)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          job_post_id,
          company_id,
          job_title,
          (courses_required || []).join(","),
          (job_categories || []).join(","),
          available_positions,
          2, // Default to 'pending' status
          job_overview,
          (job_responsibilities || []).join(","),
          preferred_qualifications || null,
          work_arrangement,
          (soft_skills || []).join(","),
          (technical_skills || []).join(","),
          street_name,
          barangay,
          city_municipality,
          postal_code,
        ]
      );

      const insertId = result.insertId;

      const [rows] = await connection.query<
        (RowDataPacket & { job_post_id: number })[]
      >(`SELECT * FROM job_posts WHERE job_post_id = ?`, [insertId]);
      console.log({ insertId, result, rows });

      await connection.commit();

      if (!rows || rows.length === 0)
        throw new Error("Failed to retrieve created job post");

      const row = rows[0] as RowDataPacket;
      // normalize arrays
      return {
        ...row,
        job_post_status: row.job_post_status_id
          ? getStatusName(row.job_post_status_id)
          : undefined,
        job_responsibilities: row.job_responsibilities
          ? row.job_responsibilities.split(",")
          : [],
        courses_required: row.courses_required
          ? row.courses_required.split(",")
          : [],
        job_categories: row.job_categories ? row.job_categories.split(",") : [],
        soft_skills: row.soft_skills ? row.soft_skills.split(",") : [],
        technical_skills: row.technical_skills
          ? row.technical_skills.split(",")
          : [],
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  getJobPostById: async (
    job_post_id: string,
    userId?: number | string,
    roleName?: string
  ): Promise<JobPost | null> => {
    try {
      // Fetch user skills and course if Applicant user
      let userSkills: string[] = [];
      let userCourse: string | null = null;
      if (userId && roleName === "Applicant") {
        try {
          const [profileRows] = await db.query<
            (RowDataPacket & { skills: string | null; course: string | null })[]
          >(`SELECT skills, course FROM applicant_profile WHERE user_id = ?`, [
            userId,
          ]);

          if (profileRows.length > 0) {
            // Get skills
            if (profileRows[0].skills) {
              userSkills = profileRows[0].skills
                .split(",")
                .map((skill) => skill.trim().toLowerCase())
                .filter((skill) => skill.length > 0);
            }
            // Get course abbreviation and convert to full course name
            if (profileRows[0].course) {
              const courseAbbr = profileRows[0].course;
              userCourse = getCourseByAbbr(courseAbbr);
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }

      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          jp.job_post_id,
          jp.company_id,
          job_post_status_id,
          jp.job_title,
          jp.courses_required,
          jp.job_categories,
          jp.available_positions,
          jp.job_overview,
          jp.job_responsibilities,
          jp.preferred_qualifications,
          jp.work_arrangement,
          jp.soft_skills,
          jp.technical_skills,
          jp.created_at,
          jp.updated_at,
          jp.street_name,
          jp.barangay,
          jp.city_municipality,
          jp.postal_code,
          c.company_name,
          c.company_image,
          c.industry,
          c.description
        FROM job_posts jp
        JOIN company c ON jp.company_id = c.company_id
        WHERE jp.job_post_id = ?`,
        [job_post_id]
      );

      if (rows.length === 0) {
        return null;
      }

      const row = rows[0];
      const technicalSkillsArray = row.technical_skills
        ? row.technical_skills.split(",").map((s: string) => s.trim())
        : [];

      const coursesRequiredArray = row.courses_required
        ? row.courses_required.split(",").map((c: string) => c.trim())
        : [];

      // Calculate skill match count for Applicant users
      let matchCount = 0;
      if (userSkills.length > 0) {
        const postSkillsLowerCase = technicalSkillsArray.map((s: string) =>
          s.toLowerCase()
        );
        matchCount = userSkills.filter((userSkill) =>
          postSkillsLowerCase.includes(userSkill)
        ).length;
      }

      // Check if user's course matches any of the required courses
      const courseMatched = userCourse
        ? coursesRequiredArray.some(
            (requiredCourse: string) =>
              requiredCourse.toLowerCase() === userCourse.toLowerCase()
          )
        : false;

      return {
        ...row,
        courses_required: coursesRequiredArray,
        job_post_status: row.job_post_status_id
          ? getStatusName(row.job_post_status_id)
          : undefined,
        job_categories: row.job_categories
          ? row.job_categories.split(",").map((cat: string) => cat.trim())
          : [],
        job_responsibilities: row.job_responsibilities
          ? row.job_responsibilities
              .split(",")
              .map((resp: string) => resp.trim())
          : [],
        soft_skills: row.soft_skills
          ? row.soft_skills.split(",").map((skill: string) => skill.trim())
          : [],
        technical_skills: technicalSkillsArray,
        industry: row.industry
          ? row.industry.split(",").map((ind: string) => ind.trim())
          : null,
        skill_match_count: matchCount,
        course_matched: courseMatched,
      } as JobPost;
    } catch (error) {
      console.error("Error fetching job post:", error);
      throw error;
    }
  },

  getJobPostSuggestions: async (
    job_post_id: string,
    userId?: number | string,
    roleName?: string
  ): Promise<JobPost[]> => {
    try {
      // Fetch user skills and course if Applicant user
      let userSkills: string[] = [];
      let userCourse: string | null = null;
      if (userId && roleName === "Applicant") {
        try {
          const [profileRows] = await db.query<
            (RowDataPacket & { skills: string | null; course: string | null })[]
          >(`SELECT skills, course FROM applicant_profile WHERE user_id = ?`, [
            userId,
          ]);

          if (profileRows.length > 0) {
            // Get skills
            if (profileRows[0].skills) {
              userSkills = profileRows[0].skills
                .split(",")
                .map((skill) => skill.trim().toLowerCase())
                .filter((skill) => skill.length > 0);
            }
            // Get course abbreviation and convert to full course name
            if (profileRows[0].course) {
              const courseAbbr = profileRows[0].course;
              userCourse = getCourseByAbbr(courseAbbr);
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }

      // Get current job post to extract categories and courses
      const [currentJobRows] = await db.query<RowDataPacket[]>(
        `SELECT job_categories, courses_required FROM job_posts WHERE job_post_id = ?`,
        [job_post_id]
      );

      if (currentJobRows.length === 0) {
        return [];
      }

      const currentJob = currentJobRows[0];
      const categories = currentJob.job_categories
        ? currentJob.job_categories.split(",").map((c: string) => c.trim())
        : [];
      const courses = currentJob.courses_required
        ? currentJob.courses_required.split(",").map((c: string) => c.trim())
        : [];

      // Build dynamic WHERE clauses for LIKE searches
      const conditions: string[] = [];
      const values: string[] = [];

      // Add category conditions
      categories.forEach((category: string) => {
        conditions.push("jp.job_categories LIKE ?");
        values.push(`%${category}%`);
      });

      // Add course conditions
      courses.forEach((course: string) => {
        conditions.push("jp.courses_required LIKE ?");
        values.push(`%${course}%`);
      });

      if (conditions.length === 0) {
        return [];
      }

      const whereClause = `(${conditions.join(
        " OR "
      )}) AND jp.job_post_id != ? AND jp.job_post_status_id = 1`;
      values.push(job_post_id);

      // Fetch suggestions (only active posts)
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          jp.job_post_id,
          jp.company_id,
          jp.job_post_status_id,
          jp.job_title,
          jp.courses_required,
          jp.job_categories,
          jp.available_positions,
          jp.job_overview,
          jp.job_responsibilities,
          jp.preferred_qualifications,
          jp.work_arrangement,
          jp.soft_skills,
          jp.technical_skills,
          jp.created_at,
          jp.updated_at,
          jp.street_name,
          jp.barangay,
          jp.city_municipality,
          jp.postal_code,
          c.company_name,
          c.company_image,
          c.industry,
          c.description
        FROM job_posts jp
        JOIN company c ON jp.company_id = c.company_id
        WHERE ${whereClause}
        ORDER BY jp.created_at DESC
        LIMIT 10`,
        values
      );

      const suggestions = rows.map((row) => {
        const technicalSkillsArray = row.technical_skills
          ? row.technical_skills.split(",").map((skill: string) => skill.trim())
          : [];

        const coursesRequiredArray = row.courses_required
          ? row.courses_required
              .split(",")
              .map((course: string) => course.trim())
          : [];

        // Calculate skill match count for Applicant users
        let matchCount = 0;
        if (userSkills.length > 0) {
          const postSkillsLowerCase = technicalSkillsArray.map((s: string) =>
            s.toLowerCase()
          );
          matchCount = userSkills.filter((userSkill) =>
            postSkillsLowerCase.includes(userSkill)
          ).length;
        }

        // Check if user's course matches any of the required courses
        const courseMatched = userCourse
          ? coursesRequiredArray.some(
              (requiredCourse: string) =>
                requiredCourse.toLowerCase() === userCourse.toLowerCase()
            )
          : false;

        return {
          ...row,
          courses_required: coursesRequiredArray,
          job_post_status: row.job_post_status_id
            ? getStatusName(row.job_post_status_id)
            : undefined,
          job_categories: row.job_categories
            ? row.job_categories.split(",").map((cat: string) => cat.trim())
            : [],
          job_responsibilities: row.job_responsibilities
            ? row.job_responsibilities
                .split(",")
                .map((resp: string) => resp.trim())
            : [],
          soft_skills: row.soft_skills
            ? row.soft_skills.split(",").map((skill: string) => skill.trim())
            : [],
          technical_skills: technicalSkillsArray,
          industry: row.industry
            ? row.industry.split(",").map((ind: string) => ind.trim())
            : null,
          skill_match_count: matchCount,
          course_matched: courseMatched,
        };
      }) as JobPost[];

      // Sort by course match and skill match count if Applicant user
      const sortedSuggestions =
        userCourse || userSkills.length > 0
          ? suggestions.sort((a, b) => {
              // First priority: course matched
              if (a.course_matched && !b.course_matched) return -1;
              if (!a.course_matched && b.course_matched) return 1;

              // Second priority: skill match count
              return (b.skill_match_count || 0) - (a.skill_match_count || 0);
            })
          : suggestions;

      return sortedSuggestions;
    } catch (error) {
      console.error("Error fetching job suggestions:", error);
      throw error;
    }
  },

  getPopularJobCategories: async (limit: number = 5) => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          job_categories,
          COUNT(*) as category_count
        FROM job_posts
        WHERE job_post_status_id = 1
        GROUP BY job_categories
        ORDER BY category_count DESC
        LIMIT ?`,
        [limit]
      );

      // Extract individual categories and count their occurrences
      const categoryMap = new Map<string, number>();

      rows.forEach((row) => {
        if (row.job_categories) {
          const categories = row.job_categories.split(" / ");
          categories.forEach((cat: string) => {
            const trimmed = cat.trim();
            if (trimmed) {
              categoryMap.set(
                trimmed,
                (categoryMap.get(trimmed) || 0) + row.category_count
              );
            }
          });
        }
      });

      // Sort by count and return top categories
      const sortedCategories = Array.from(categoryMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([category]) => category);

      return sortedCategories;
    } catch (error) {
      console.error("Error fetching popular job categories:", error);
      throw error;
    }
  },
};

export default JobPostingServices;
