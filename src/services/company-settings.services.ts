import { db } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcrypt"

export const CompanySettingsServices = {
  getCompanySettings: async (company_id: string) => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
          c.company_id,
          c.company_name,
          c.company_email,
          c.phone_number,
          c.telephone_number,
          c.city_municipality,
          c.barangay,
          c.date_founded,
          c.description,
          c.industry,
          c.company_image,
          c.website,
          c.facebook_page,
          c.instagram_page,
          c.twitter_page,
          a.password_hash IS NOT NULL as has_password
        FROM company c
        INNER JOIN account a ON c.company_id = a.company_id
        WHERE c.company_id = ?`,
        [company_id]
      );

      if (rows.length === 0) {
        throw new ServiceError("Company not found", 404);
      }

      const company = rows[0];

      return {
        ...company,
        industry: company.industry ? company.industry.split(",").map((ind: string) => ind.trim()) : [],
        has_password: Boolean(company.has_password),
      };
    } catch (error) {
      console.error("Failed to fetch company settings:", error);
      throw error;
    }
  },

  updateCompanyProfile: async (
    company_id: string,
    data: {
      company_name: string;
      description: string;
      industry: string[];
      date_founded: string;
    }
  ) => {
    try {
      const industryString = data.industry.join(",");

      const [result] = await db.query<ResultSetHeader>(
        `UPDATE company 
         SET company_name = ?, 
             description = ?, 
             industry = ?, 
             date_founded = ?
         WHERE company_id = ?`,
        [data.company_name, data.description, industryString, data.date_founded, company_id]
      );

      if (result.affectedRows === 0) {
        throw new ServiceError("Failed to update company profile", 400);
      }

      return { message: "Company profile updated successfully" };
    } catch (error) {
      console.error("Failed to update company profile:", error);
      throw error;
    }
  },

  updateCompanyLogo: async (company_id: string, logoPath: string) => {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `UPDATE company 
         SET company_image = ?
         WHERE company_id = ?`,
        [logoPath, company_id]
      );

      if (result.affectedRows === 0) {
        throw new ServiceError("Failed to update company logo", 400);
      }

      return { company_image: logoPath };
    } catch (error) {
      console.error("Failed to update company logo:", error);
      throw error;
    }
  },

  updateContactInfo: async (
    company_id: string,
    data: {
      phone_number: string;
      telephone_number: string;
      website: string;
      facebook_page: string;
      instagram_page: string;
      twitter_page: string;
    }
  ) => {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `UPDATE company 
         SET phone_number = ?, 
             telephone_number = ?, 
             website = ?, 
             facebook_page = ?, 
             instagram_page = ?, 
             twitter_page = ?
         WHERE company_id = ?`,
        [
          data.phone_number,
          data.telephone_number,
          data.website,
          data.facebook_page,
          data.instagram_page,
          data.twitter_page,
          company_id,
        ]
      );

      if (result.affectedRows === 0) {
        throw new ServiceError("Failed to update contact information", 400);
      }

      return { message: "Contact information updated successfully" };
    } catch (error) {
      console.error("Failed to update contact info:", error);
      throw error;
    }
  },

  updateLocation: async (
    company_id: string,
    data: {
      city_municipality: string;
      barangay: string;
    }
  ) => {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `UPDATE company 
         SET city_municipality = ?, 
             barangay = ?
         WHERE company_id = ?`,
        [data.city_municipality, data.barangay, company_id]
      );

      if (result.affectedRows === 0) {
        throw new ServiceError("Failed to update location", 400);
      }

      return { message: "Location updated successfully" };
    } catch (error) {
      console.error("Failed to update location:", error);
      throw error;
    }
  },

  updatePassword: async (
    company_id: string,
    currentPassword: string | undefined,
    newPassword: string
  ) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // If current password provided, verify it
      if (currentPassword) {
        const [rows] = await connection.query<RowDataPacket[]>(
          `SELECT password FROM account WHERE company_id = ?`,
          [company_id]
        );

        if (rows.length === 0) {
          throw new ServiceError("Account not found", 404);
        }

        const isValid = await bcrypt.compare(currentPassword, rows[0].password);

        if (!isValid) {
          throw new ServiceError("Current password is incorrect", 401);
        }
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      const [result] = await connection.query<ResultSetHeader>(
        `UPDATE account SET password = ? WHERE company_id = ?`,
        [hashedPassword, company_id]
      );

      if (result.affectedRows === 0) {
        throw new ServiceError("Failed to update password", 400);
      }

      await connection.commit();
      return { message: "Password updated successfully" };
    } catch (error) {
      await connection.rollback();
      console.error("Failed to update password:", error);
      throw error;
    } finally {
      connection.release();
    }
  },
};
