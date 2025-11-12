"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import type {
  CompanyPost as CompanyPostType,
  PostReactions,
  ReactionType,
} from "@/types/company_post.types";
import { ReactionButton } from "./ReactionButton";
import { ReactionsModal } from "./ReactionsModal";
import placeholder_image from "@/images/placeholder_image.avif";
import { CopyLinkButton } from "@/components/common/button/CopyLinkButton";
import DateDifference from "@/components/common/DateDifference";

interface CompanyPostProps {
  post: CompanyPostType;
}

export function CompanyPost({ post }: CompanyPostProps) {
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [reactions, setReactions] = useState<PostReactions>({
    like: 2,
    insightful: 1,
    supportive: 0,
    exciting: 3,
    interested: 0,
    curious: 1,
  });
  const [showReactionsModal, setShowReactionsModal] = useState(false);

  const handleReact = (reaction: ReactionType | null) => {
    if (userReaction) {
      setReactions((prev) => ({
        ...prev,
        [userReaction]: Math.max(0, (prev[userReaction] || 0) - 1),
      }));
    }

    if (reaction) {
      setReactions((prev) => ({
        ...prev,
        [reaction]: (prev[reaction] || 0) + 1,
      }));
    }

    setUserReaction(reaction);
  };

  const handleSavePost = () => {
    // TODO: Implement save post functionality
    console.log("Save post clicked for:", post.post_id);
  };

  const totalReactions = Object.values(reactions).reduce(
    (a, b) => a + (b || 0),
    0
  );

  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const postUrl = `${baseUrl}/feed/view?id=${post.post_id}`;

  return (
    <>
      <Card className="w-full h-fit max-w-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link
                href={`/view/company?id=${post.company_id}`}
                className="font-semibold text-base text-card-foreground hover:text-primary transition-colors"
              >
                {post.company_name}
              </Link>
              <DateDifference
                className="text-xs text-muted-foreground"
                date={post.created_at}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-card-foreground mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-card-foreground/80 whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {post.cover_image && (
            <div className="relative w-full h-96 border rounded-md">
              <Image
                src={post.cover_image || placeholder_image}
                alt={post.title}
                fill
                className="rounded-lg object-contain"
                priority={false}
              />
            </div>
          )}

          <div className="flex items-center gap-2 pt-3 border-t justify-between">
            <ReactionButton
              userReaction={userReaction}
              onReact={handleReact}
              totalReactions={totalReactions}
              onShowReactionsModal={() => setShowReactionsModal(true)}
            />

            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSavePost}
                className="gap-2 h-8 text-skillmatch-muted-dark hover:text-foreground"
              >
                <Bookmark className="w-4 h-4" />
                <span className="text-xs">Save</span>
              </Button>

              <CopyLinkButton
                url={postUrl}
                size="sm"
                showIcon={true}
                showText={true}
                text="Copy Link"
                className="gap-2 h-8 text-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <ReactionsModal
        open={showReactionsModal}
        onOpenChange={setShowReactionsModal}
        reactions={reactions}
      />
    </>
  );
}
