import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import SavedItemsServices from "@/services/saved-items.services";

// GET - Get all saved companies
export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const savedCompanies = await SavedItemsServices.getSavedCompanies(
      session.user.user_id.toString()
    );

    return NextResponse.json({ savedCompanies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved companies:", error);
    return NextResponse.json(
      { message: "Failed to fetch saved companies" },
      { status: 500 }
    );
  }
}

// POST - Save a company
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { company_id } = await request.json();

    if (!company_id) {
      return NextResponse.json(
        { message: "Company ID is required" },
        { status: 400 }
      );
    }

    const result = await SavedItemsServices.saveCompany(
      session.user.user_id.toString(),
      company_id
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error saving company:", error);
    return NextResponse.json(
      { message: "Failed to save company" },
      { status: 500 }
    );
  }
}

// DELETE - Unsave a company
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const company_id = searchParams.get("company_id");

    if (!company_id) {
      return NextResponse.json(
        { message: "Company ID is required" },
        { status: 400 }
      );
    }

    const result = await SavedItemsServices.unsaveCompany(
      session.user.user_id.toString(),
      company_id
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error unsaving company:", error);
    return NextResponse.json(
      { message: "Failed to unsave company" },
      { status: 500 }
    );
  }
}
