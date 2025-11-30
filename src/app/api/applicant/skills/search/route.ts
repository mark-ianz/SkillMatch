import { SkillServices } from "@/services/skill.services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchQuery = new URL(request.url).searchParams.get("q");
  const typeParam = new URL(request.url).searchParams.get("type");
  const skillType: "soft" | "technical" = typeParam === "soft" ? "soft" : "technical";

  if (!searchQuery) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 }
    );
  }

  const skills = await SkillServices.searchSkill(searchQuery, skillType);

  return NextResponse.json({ skills });
}
