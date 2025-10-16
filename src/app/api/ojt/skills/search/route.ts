import { SkillServices } from "@/services/skill.services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchQuery = new URL(request.url).searchParams.get("q");

  if (!searchQuery) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 }
    );
  }

  const skills = await SkillServices.searchSkill(searchQuery);

  return NextResponse.json({ skills });
}
