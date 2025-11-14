import { formatZodError } from "@/lib/utils";
import { updateSkillSchema } from "@/schema/skill";
import { SkillServices } from "@/services/skill.services";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: { params: { user_id: string } }) {
  const params = await context.params;
  const user_id = params.user_id;
  if (!user_id) {
    return new Response("Missing user_id", { status: 400 });
  }

  const { skills } = await request.json();

  const { data, error, success } = updateSkillSchema.safeParse(skills);

  if (!success) {
    return NextResponse.json({ error: formatZodError(error), errorr: error }, { status: 422 });
  }

  try {
    await SkillServices.updateSkills(user_id, data);
    return NextResponse.json({ status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 }
    );
  }
}

export async function GET (_: Request, context: { params: { user_id: string } }) {
  const params = await context.params;
  const user_id = params.user_id;
  if (!user_id) {
    return new Response("Missing user_id", { status: 400 });
  }

  try {
    const skillNames = await SkillServices.getUserSkills(user_id);
    return NextResponse.json({ skills: skillNames });
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve skills" },
      { status: 500 }
    );
  }
}