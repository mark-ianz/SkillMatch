import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

export async function POST() {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.company_id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const company_id = session.user.company_id;

    // Check if company is in rejected status
    const [accountRows] = await db.query<({ status_id: number } & RowDataPacket)[]>(
      "SELECT status_id FROM account WHERE company_id = ?",
      [company_id]
    );

    if (!accountRows || accountRows.length === 0) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404 }
      );
    }

    const status_id = accountRows[0].status_id;

    if (status_id !== 3) {
      return NextResponse.json(
        { error: "Only rejected accounts can resubmit" },
        { status: 400 }
      );
    }

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Create new onboarding row starting from step 1
      await connection.query(
        `INSERT INTO onboarding (company_id, step, created_at, updated_at) 
         VALUES (?, 1, NOW(), NOW())
         ON DUPLICATE KEY UPDATE step = 1, updated_at = NOW()`,
        [company_id]
      );

      // Change status from rejected (3) to onboarding (7)
      // Clear rejection reason since they're resubmitting
      await connection.query(
        "UPDATE account SET status_id = 7, rejected_reason = NULL WHERE company_id = ?",
        [company_id]
      );

      await connection.commit();

      return NextResponse.json({
        success: true,
        message: "You can now resubmit your application",
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error in resubmit application:", error);
    return NextResponse.json(
      { error: "Failed to process resubmission request" },
      { status: 500 }
    );
  }
}
