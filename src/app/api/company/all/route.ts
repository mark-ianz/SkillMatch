import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { CompanyProfile } from "@/types/company.types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    console.log("Here")
    // Extract filter parameters
    const industries = searchParams.getAll("industry");
    const search = searchParams.get("search");

    // Build dynamic WHERE clauses
    const conditions: string[] = [];
    const values: (string | number)[] = [];

    // Handle industries (comma-separated in DB)
    if (industries.length > 0) {
      const industryConditions = industries.map(() => "FIND_IN_SET(?, c.industry) > 0");
      conditions.push(`(${industryConditions.join(" OR ")})`);
      values.push(...industries);
    }

    // Handle search query (search in company name and description)
    if (search && search.trim()) {
      conditions.push(`(
        c.company_name LIKE ? OR 
        c.description LIKE ?
      )`);
      const searchTerm = `%${search.trim()}%`;
      values.push(searchTerm, searchTerm);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT 
        c.company_id,
        c.company_name,
        c.company_email,
        c.telephone_number,
        c.phone_number,
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
        c.created_at
      FROM company c
      ${whereClause}
      ORDER BY c.created_at DESC`,
      values
    );

    const formattedRows = rows.map((row) => ({
      ...row,
      industry: row.industry ? row.industry.split(",").map((ind: string) => ind.trim()) : null,
    })) as CompanyProfile[];

    return NextResponse.json(
      { companies: formattedRows },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      {
        status: 500,
      }
    );
  }
}
