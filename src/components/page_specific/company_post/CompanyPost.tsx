"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CompanyPost as CompanyPostType } from "@/types/company_post.types";
import { ReactionButton } from "./ReactionButton";
import { ReactionsModal } from "./ReactionsModal";
import placeholder_image from "@/images/placeholder_image.avif";
import { CopyLinkButton } from "@/components/common/button/CopyLinkButton";
import DateDifference from "@/components/common/DateDifference";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SavePostButton } from "./SavePostButton";
import LinkWithIcon from "@/components/global/LinkWithIcon";

interface CompanyPostProps {
  post: CompanyPostType;
}

export function CompanyPost({ post }: CompanyPostProps) {
  const [showReactionsModal, setShowReactionsModal] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const postUrl = `${baseUrl}/view/feed/${post.post_id}`;

  return (
    <>
      <Card className="w-full h-fit shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 ring-2 ring-border/50">
              <AvatarImage
                className="object-cover"
                src={post.company_image}
                alt={post.company_name}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {post.company_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <LinkWithIcon
                className="text-base"
                iconClassName="w-3 h-3"
                path={`/view/company/${post.company_id}`}
                text={post.company_name}
              />
              <DateDifference
                className="text-xs text-muted-foreground block"
                date={post.created_at}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-card-foreground leading-tight">
              {post.title}
            </h2>
            <p
              className={`text-sm text-card-foreground/80 whitespace-pre-wrap leading-relaxed ${
                !isContentExpanded ? "line-clamp-4" : ""
              }`}
            >
              {post.content}
            </p>
            {post.content && post.content.length > 200 && (
              <button
                type="button"
                onClick={() => setIsContentExpanded(!isContentExpanded)}
                className="text-sm font-medium text-skillmatch-primary-blue cursor-pointer hover:underline transition-colors"
              >
                {isContentExpanded ? "See less" : "See more..."}
              </button>
            )}
          </div>

          {post.cover_image && (
            <div className="relative w-full h-96 border rounded-lg overflow-hidden bg-muted/20">
              <Image
                src={post.cover_image || placeholder_image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                priority
                fetchPriority="high"
                className="object-contain hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex items-center gap-2 pt-2 border-t">
            <ReactionButton
              post_id={post.post_id}
              onShowReactionsModal={() => setShowReactionsModal(true)}
            />

            <div className="ml-auto flex items-center gap-1">
              <SavePostButton postId={post.post_id} />

              <CopyLinkButton
                url={postUrl}
                size="sm"
                showIcon={true}
                showText={true}
                text="Copy Link"
                className="gap-2 h-9 text-xs font-medium hover:bg-muted/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <ReactionsModal
        open={showReactionsModal}
        onOpenChange={setShowReactionsModal}
        post_id={post.post_id}
      />
    </>
  );
}
