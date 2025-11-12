import { db } from "@/lib/db";
import { CompanyProfile } from "@/types/company.types";
import { RowDataPacket } from "mysql2";

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

      const [rows] = await connection.query<RowDataPacket[]>(query, [userCourse]);

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
};

export default CompanyServices;
