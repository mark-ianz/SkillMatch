"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import type {
  CompanyPost as CompanyPostType,
  PostReactions,
  ReactionType,
} from "@/types/company_post.types";
import { formatDistanceToNow } from "date-fns";
import { ReactionButton } from "./ReactionButton";
import { ReactionsModal } from "./ReactionsModal";
import placeholder_image from "@/images/placeholder_image.avif"

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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.content.substring(0, 100),
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Optional: show toast notification
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const totalReactions = Object.values(reactions).reduce(
    (a, b) => a + (b || 0),
    0
  );
  const createdAt = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  return (
    <>
      <Card className="w-full h-fit max-w-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base text-card-foreground">
                {post.company_name}
              </h3>
              <p className="text-xs text-muted-foreground">{createdAt}</p>
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

          <div className="flex items-center gap-2 pt-3 border-t">
            <ReactionButton
              userReaction={userReaction}
              onReact={handleReact}
              totalReactions={totalReactions}
              onShowReactionsModal={() => setShowReactionsModal(true)}
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="gap-2 h-8 text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-xs">Share</span>
            </Button>
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
