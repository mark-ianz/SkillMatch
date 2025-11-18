import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import SavedItemsServices from "@/services/saved-items.services";

// GET - Get all saved posts
export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const savedPosts = await SavedItemsServices.getSavedPosts(
      session.user.user_id.toString()
    );

    return NextResponse.json({ savedPosts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch saved posts" },
      { status: 500 }
    );
  }
}

// POST - Save a post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.user_id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { post_id } = await request.json();

    if (!post_id) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    const result = await SavedItemsServices.savePost(
      session.user.user_id.toString(),
      post_id
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error saving post:", error);
    return NextResponse.json(
      { message: "Failed to save post" },
      { status: 500 }
    );
  }
}

// DELETE - Unsave a post
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
    const post_id = searchParams.get("post_id");

    if (!post_id) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    const result = await SavedItemsServices.unsavePost(
      session.user.user_id.toString(),
      post_id
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error unsaving post:", error);
    return NextResponse.json(
      { message: "Failed to unsave post" },
      { status: 500 }
    );
  }
}
