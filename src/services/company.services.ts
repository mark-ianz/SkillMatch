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
};

export default CompanyServices;
