import { NextResponse } from "next/server";
import { CompanyPostServices } from "@/services/company-post.services";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const company_id = searchParams.get("company_id");

    if (!company_id) {
      return NextResponse.json(
        { error: "Missing company_id" },
        { status: 400 }
      );
    }

    const posts = await CompanyPostServices.getCompanyOwnPosts(company_id);
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch company posts", error);
    return NextResponse.json(
      { error: "Failed to fetch company posts" },
      { status: 500 }
    );
  }
}
