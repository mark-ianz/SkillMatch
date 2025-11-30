import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { Status } from "@/types/status.types";
import { Company } from "@/types/company.types";

// Get all companies with their account status
export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    let query = `
      SELECT 
        c.*,
        a.email,
        a.status_id,
        a.created_at as account_created_at,
        s.status
      FROM company c
      INNER JOIN account a ON c.company_id = a.company_id
      LEFT JOIN status s ON a.status_id = s.status_id
    `;

    const params: number[] = [];

    if (statusFilter && statusFilter !== "all") {
      query += " WHERE a.status_id = ?";
      params.push(parseInt(statusFilter));
    }

    query += " ORDER BY a.created_at DESC";

    const [companies] = await db.query<(RowDataPacket & Company & Status)[]>(query, params);

    // Map status to status_name for frontend
    const mappedCompanies = Array.isArray(companies)
      ? companies.map((company) => ({
          ...company,
          status_name: company.status || "Unknown",
        }))
      : [];

    return NextResponse.json(mappedCompanies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
