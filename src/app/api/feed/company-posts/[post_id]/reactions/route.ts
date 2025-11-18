import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import CompanyPostServices from "@/services/company-post.services";
import { ReactionType } from "@/types/company_post.types";

// GET - Get reaction counts and user's reaction
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {
  try {
    const { post_id } = await params;
    const session = await getServerSession(authConfig);

    // Get reaction counts (public)
    const counts = await CompanyPostServices.getReactionCounts(post_id);
    const totalReactions = Object.values(counts).reduce(
      (sum, count) => sum + count,
      0
    );

    // Get user's reaction if authenticated
    let userReaction: ReactionType | null = null;
    if (session?.user) {
      const userId =
        session.user.role_id === 3
          ? undefined
          : session.user.user_id?.toString();
      const companyId =
        session.user.role_id === 4 ? session.user.company_id : undefined;

      userReaction = await CompanyPostServices.getUserReaction(
        post_id,
        userId,
        companyId
      );
    }

    return NextResponse.json(
      {
        counts,
        totalReactions,
        userReaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return NextResponse.json(
      { message: "Failed to fetch reactions" },
      { status: 500 }
    );
  }
}

// POST - Add or update a reaction
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { post_id } = await params;
    const { reaction_type } = await request.json();

    if (!reaction_type) {
      return NextResponse.json(
        { message: "Reaction type is required" },
        { status: 400 }
      );
    }

    const validReactions: ReactionType[] = [
      "like",
      "insightful",
      "supportive",
      "exciting",
      "interested",
      "curious",
    ];

    if (!validReactions.includes(reaction_type)) {
      return NextResponse.json(
        { message: "Invalid reaction type" },
        { status: 400 }
      );
    }

    const userId =
      session.user.role_id === 3 ? session.user.user_id?.toString() : undefined;
    const companyId =
      session.user.role_id === 4 ? session.user.company_id : undefined;
    console.log(session);
    await CompanyPostServices.addOrUpdateReaction(
      post_id,
      reaction_type,
      userId,
      companyId
    );

    // Get updated counts
    const counts = await CompanyPostServices.getReactionCounts(post_id);
    const totalReactions = Object.values(counts).reduce(
      (sum, count) => sum + count,
      0
    );

    return NextResponse.json(
      {
        success: true,
        counts,
        totalReactions,
        userReaction: reaction_type,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding reaction:", error);
    return NextResponse.json(
      { message: "Failed to add reaction" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a reaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ post_id: string }> }
) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { post_id } = await params;
    const userId =
      session.user.role_id === 3 ? undefined : session.user.user_id?.toString();
    const companyId =
      session.user.role_id === 4 ? session.user.company_id : undefined;

    await CompanyPostServices.removeReaction(post_id, userId, companyId);

    // Get updated counts
    const counts = await CompanyPostServices.getReactionCounts(post_id);
    const totalReactions = Object.values(counts).reduce(
      (sum, count) => sum + count,
      0
    );

    return NextResponse.json(
      {
        success: true,
        counts,
        totalReactions,
        userReaction: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing reaction:", error);
    return NextResponse.json(
      { message: "Failed to remove reaction" },
      { status: 500 }
    );
  }
}
