"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import type { CompanyPost as CompanyPostType } from "@/types/company_post.types";
import { ReactionButton } from "./ReactionButton";
import { ReactionsModal } from "./ReactionsModal";
import placeholder_image from "@/images/placeholder_image.avif";
import { CopyLinkButton } from "@/components/common/button/CopyLinkButton";
import DateDifference from "@/components/common/DateDifference";
import { useSession } from "next-auth/react";
import { SignInPromptDialog } from "@/components/common/SignInPromptDialog";
import {
  useIsPostSaved,
  useSavePost,
  useUnsavePost,
} from "@/hooks/query/useSavedItems";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CompanyPostProps {
  post: CompanyPostType;
}

export function CompanyPost({ post }: CompanyPostProps) {
  const [showReactionsModal, setShowReactionsModal] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const { data: session } = useSession();
  const isSaved = useIsPostSaved(post.post_id);
  const savePostMutation = useSavePost();
  const unsavePostMutation = useUnsavePost();

  const handleSavePost = () => {
    if (!session) {
      setShowSignInDialog(true);
      return;
    }

    if (isSaved) {
      unsavePostMutation.mutate(post.post_id);
    } else {
      savePostMutation.mutate(post.post_id);
    }
  };

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
              <AvatarImage src={post.company_image} alt={post.company_name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {post.company_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Link
                href={`/view/company/${post.company_id}`}
                className="font-semibold text-base text-card-foreground hover:text-primary transition-colors inline-block"
              >
                {post.company_name}
              </Link>
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
              {/* Save button - Only visible for applicants (role_id 3) */}
              {session?.user?.role_id === 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSavePost}
                  disabled={
                    savePostMutation.isPending || unsavePostMutation.isPending
                  }
                  className="gap-2 h-9 text-skillmatch-muted-dark hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Bookmark
                    className={cn(
                      "w-4 h-4 transition-all",
                      isSaved && "fill-current text-primary"
                    )}
                  />
                  <span className="text-xs font-medium">
                    {isSaved ? "Saved" : "Save"}
                  </span>
                </Button>
              )}

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

      <SignInPromptDialog
        open={showSignInDialog}
        onOpenChange={setShowSignInDialog}
        title="Save this post for later"
        description="Sign in to save posts and access them anytime from your saved items."
      />
    </>
  );
}
