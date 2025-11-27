import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Update company status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { company_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    // Check if user is admin
    if (!session || session.user.role_id !== 3) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { company_id } = params;
    const { status_id, reason } = await request.json();

    // Validate status_id - Company account statuses: 1=active, 2=pending, 3=rejected, 4=disabled, 7=onboarding
    if (!status_id || ![1, 2, 3, 4, 7].includes(status_id)) {
      return NextResponse.json(
        { error: "Invalid status_id" },
        { status: 400 }
      );
    }

    // Update account status
    await db.query(
      "UPDATE account SET status_id = ? WHERE company_id = ?",
      [status_id, company_id]
    );

    // If rejected (status_id = 3), you might want to store the reason
    // For now, we'll just update the status

    return NextResponse.json({ 
      success: true, 
      message: "Company status updated successfully" 
    });
  } catch (error) {
    console.error("Error updating company status:", error);
    return NextResponse.json(
      { error: "Failed to update company status" },
      { status: 500 }
    );
  }
}

// Get single company details
export async function GET(
  request: NextRequest,
  { params }: { params: { company_id: string } }
) {
  try {
    const session = await getServerSession(authConfig);

    // Check if user is admin
    if (!session || session.user.role_id !== 3) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { company_id } = params;

    const [companies] = await db.query(
      `
      SELECT 
        c.*,
        a.email as company_email,
        a.status_id,
        a.created_at as account_created_at,
        s.status_name
      FROM company c
      INNER JOIN account a ON c.company_id = a.company_id
      LEFT JOIN status s ON a.status_id = s.status_id
      WHERE c.company_id = ?
      `,
      [company_id]
    );

    if (!Array.isArray(companies) || companies.length === 0) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(companies[0]);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Failed to fetch company" },
      { status: 500 }
    );
  }
}
