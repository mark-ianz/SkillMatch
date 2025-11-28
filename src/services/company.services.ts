import { db } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import { getCourseByAbbr } from "@/lib/utils";
import { CompanyProfile } from "@/types/company.types";
import { JobPost } from "@/types/job_post.types";
import { RowDataPacket } from "mysql2";

interface CompanyProfileSidebar {
  company_id: string;
  company_name: string;
  location: string;
  company_image: string | null;
}

interface CompanyProfileHeader {
  company_name: string;
  email: string;
  company_image: string | null;
}

export const CompanyServices = {
  getAllCompanies: async (): Promise<CompanyProfile[]> => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          company_id,
          company_name,
          company_email,
          website,
          facebook_page,
          company_image,
          industry,
          description,
          date_founded,
          created_at
        FROM company
        ORDER BY created_at DESC`
      );

      return rows.map((row) => ({
        ...row,
        industry: row.industry ? row.industry.split(",") : null,
      })) as CompanyProfile[];
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      throw error;
    }
  },

  getSuggestedCompaniesForOJT: async (userCourse: string): Promise<CompanyProfile[]> => {
    const full_course = getCourseByAbbr(userCourse);

    const connection = await db.getConnection();
    try {
      // Get companies that have job posts matching the user's course
      // Sort by the number of matching job posts
      const query = `
        SELECT 
          c.company_id,
          c.company_name,
          c.company_email,
          c.website,
          c.facebook_page,
          c.company_image,
          c.industry,
          c.description,
          c.date_founded,
          c.created_at,
          COUNT(jp.job_post_id) as match_count
        FROM company c
        INNER JOIN job_posts jp ON c.company_id = jp.company_id
        WHERE FIND_IN_SET(?, jp.courses_required) > 0
        GROUP BY c.company_id
        ORDER BY match_count DESC, c.created_at DESC
        LIMIT 10
      `;

      const [rows] = await connection.query<RowDataPacket[]>(query, [full_course]);

      return rows.map((row) => ({
        company_id: row.company_id,
        company_name: row.company_name,
        company_email: row.company_email,
        website: row.website,
        facebook_page: row.facebook_page,
        company_image: row.company_image,
        industry: row.industry ? row.industry.split(",") : null,
        description: row.description,
        date_founded: row.date_founded,
        created_at: row.created_at,
      })) as CompanyProfile[];
    } catch (error) {
      console.error("Failed to fetch suggested companies:", error);
      throw error;
    } finally {
      connection.release();
    }
  },

  getCompanyProfileForSidebar: async (company_id: string): Promise<CompanyProfileSidebar | null> => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          c.company_id,
          c.company_name,
          CONCAT(c.barangay, ', ', c.city_municipality) as location,
          c.company_image
        FROM company c
        WHERE c.company_id = ?`,
        [company_id]
      );

      if (rows.length === 0) return null;

      return rows[0] as CompanyProfileSidebar;
    } catch (error) {
      console.error("Failed to fetch company profile:", error);
      throw error;
    }
  },

  getCompanyProfileForHeader: async (company_id: string): Promise<CompanyProfileHeader | null> => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          c.company_name,
          a.email,
          c.company_image
        FROM company c
        INNER JOIN account a ON c.company_id = a.company_id
        WHERE c.company_id = ?`,
        [company_id]
      );

      if (rows.length === 0) return null;

      return rows[0] as CompanyProfileHeader;
    } catch (error) {
      console.error("Failed to fetch company profile for header:", error);
      throw error;
    }
  },

  getCompanyWithJobs: async (company_id: string): Promise<{ company_profile: CompanyProfile, job_posted: JobPost[] }> => {
    try {
      // Fetch company profile (excluding private document paths)
      const [companyRows] = await db.query<RowDataPacket[]>(
        `SELECT 
        company_id,
        company_name,
        company_email,
        telephone_number,
        phone_number,
        city_municipality,
        barangay,
        date_founded,
        description,
        industry,
        company_image,
        website,
        facebook_page,
        instagram_page,
        twitter_page,
        created_at
      FROM company
      WHERE company_id = ?`,
        [company_id]
      );

      if (companyRows.length === 0) {
        throw new ServiceError("Company not found", 404);
      }

      const company_profile = {
        ...companyRows[0],
        industry: companyRows[0].industry
          ? companyRows[0].industry.split(",").map((ind: string) => ind.trim())
          : null,
      } as CompanyProfile;

      // Fetch all job posts for this company
      const [jobRows] = await db.query<RowDataPacket[]>(
        `SELECT 
        jp.*,
        c.company_name,
        c.company_image,
        c.industry,
        c.description,
        c.barangay,
        c.city_municipality
      FROM job_posts jp
      JOIN company c ON jp.company_id = c.company_id
      WHERE jp.company_id = ?
      ORDER BY jp.created_at DESC`,
        [company_id]
      );

      const job_posted = jobRows.map((row) => ({
        ...row,
        courses_required: row.courses_required
          ? row.courses_required.split(",").map((course: string) => course.trim())
          : [],
        job_categories: row.job_categories
          ? row.job_categories.split(",").map((cat: string) => cat.trim())
          : [],
        job_responsibilities: row.job_responsibilities
          ? row.job_responsibilities.split(",").map((resp: string) => resp.trim())
          : [],
        soft_skills: row.soft_skills
          ? row.soft_skills.split(",").map((skill: string) => skill.trim())
          : [],
        technical_skills: row.technical_skills
          ? row.technical_skills.split(",").map((skill: string) => skill.trim())
          : [],
        industry: row.industry
          ? row.industry.split(",").map((ind: string) => ind.trim())
          : null,
      })) as JobPost[];

      return { company_profile, job_posted }
    } catch (error) {
      console.error("Error fetching company profile with jobs:", error);
      throw new ServiceError("Failed to fetch company profile with jobs", 500);
    }
  }
}

export default CompanyServices;
