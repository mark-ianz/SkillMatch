import { NextResponse } from "next/server";
import ResumeService from "@/services/resume.services";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user_id = Number(body.user_id);
    if (!user_id || isNaN(user_id)) {
      return NextResponse.json({ error: "Invalid user_id" }, { status: 400 });
    }

    const ok = await ResumeService.delete_resume(user_id);
    if (!ok) {
      return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
    }
    return NextResponse.json({ status: 204 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
