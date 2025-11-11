import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  context: { params: { id: string | undefined; farthestStep: number | undefined } }
) {
  const params = await context.params;

  if (!params.id) {
    return NextResponse.json({ error: "Invalid or missing ID parameter" }, { status: 400 });
  }

  if (!params.farthestStep || isNaN(Number(params.farthestStep))) {
    return NextResponse.json({ error: "Invalid or missing farthestStep parameter" }, { status: 400 });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Finalize company onboarding: set account active and remove onboarding row for company
    await connection.query(`UPDATE account SET status_id = ? WHERE company_id = ?`, [1, params.id]);
    await connection.query(`DELETE FROM onboarding WHERE company_id = ?`, [params.id]);

    await connection.commit();
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    await connection.rollback();
    console.error("Error finalizing company onboarding on skip:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    connection.release();
  }
}
