import { NextResponse } from "next/server";
import JobPostingServices from "@/services/job-posting.services";

export async function GET() {
  try {
    const categories = await JobPostingServices.getPopularJobCategories(5);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching popular categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch popular categories" },
      { status: 500 }
    );
  }
}
