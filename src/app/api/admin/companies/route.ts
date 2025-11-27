import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Get all companies with their account status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    // Check if user is admin (role_id 2)
    if (!session || session.user.role_id !== 2) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    let query = `
      SELECT 
        c.*,
        a.email as company_email,
        a.status_id,
        a.created_at as account_created_at,
        s.status_name
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

    const [companies] = await db.query(query, params);

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
