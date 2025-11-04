import { SkillServices } from "@/services/skill.services";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const skill_name = typeof body?.skill_name === "string" ? body.skill_name.trim() : null;
    const type = body?.type === "soft" ? "soft" : "technical";

    if (!skill_name || skill_name.length < 2 || skill_name.length > 100) {
      return NextResponse.json({ error: "Invalid skill_name" }, { status: 422 });
    }

    try {
      const skill = await SkillServices.createSkill(skill_name, type);
      return NextResponse.json({ skill }, { status: 201 });
    } catch (err: unknown) {
      // MySQL duplicate entry
      const e = err as { code?: string };
      if (e?.code === "ER_DUP_ENTRY") {
        return NextResponse.json({ error: "Skill already exists" }, { status: 409 });
      }
      console.error("Failed to create skill", err);
      return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
    }
  } catch (err) {
    console.error("Invalid request body for create skill", err);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
