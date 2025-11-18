"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactionType } from "@/types/company_post.types";
import {
  useReactions,
  useAddReaction,
  useRemoveReaction,
} from "@/hooks/query/useReactions";
import { useSession } from "next-auth/react";
import { SignInPromptDialog } from "@/components/common/SignInPromptDialog";

const REACTIONS: Record<ReactionType, { emoji: string; label: string }> = {
  like: { emoji: "👍", label: "Like" },
  insightful: { emoji: "💡", label: "Insightful" },
  supportive: { emoji: "🤝", label: "Supportive" },
  exciting: { emoji: "🎉", label: "Exciting" },
  interested: { emoji: "👀", label: "Interested" },
  curious: { emoji: "🤔", label: "Curious" },
};

interface ReactionButtonProps {
  post_id: string;
  onShowReactionsModal?: () => void;
}

export function ReactionButton({
  post_id,
  onShowReactionsModal,
}: ReactionButtonProps) {
  const [open, setOpen] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const { data: session } = useSession();
  
  const { data: reactionData, isLoading } = useReactions(post_id);
  const addReaction = useAddReaction();
  const removeReaction = useRemoveReaction();

  const userReaction = reactionData?.userReaction || null;
  const totalReactions = reactionData?.totalReactions || 0;

  const handleReactionClick = (reaction: ReactionType) => {
    if (!session?.user) {
      setOpen(false);
      setShowSignInDialog(true);
      return;
    }

    if (userReaction === reaction) {
      // Remove reaction if clicking the same one
      removeReaction.mutate({ post_id });
    } else {
      // Add or update reaction
      addReaction.mutate({ post_id, reaction_type: reaction });
    }
    setOpen(false);
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" className="h-8" disabled>
        👍
      </Button>
    );
  }

  return (
    <>
      <TooltipProvider>
        <div className="relative flex items-center gap-2">
          {totalReactions > 0 && (
            <button
              onClick={onShowReactionsModal}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-1"
            >
              {totalReactions}
            </button>
          )}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              {userReaction ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 h-8 bg-skillmatch-muted-light/30"
                  disabled={addReaction.isPending || removeReaction.isPending}
                >
                  <span className="text-lg">{REACTIONS[userReaction].emoji}</span>
                  <span className="text-xs">{REACTIONS[userReaction].label}</span>
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8"
                  disabled={addReaction.isPending || removeReaction.isPending}
                >
                  👍
                </Button>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-fit p-3" align="start">
              <div className="flex gap-2">
                {(Object.keys(REACTIONS) as ReactionType[]).map((reaction) => (
                  <Tooltip key={reaction} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleReactionClick(reaction)}
                        className="text-2xl rounded transition-transform duration-150 hover:scale-125 cursor-pointer p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={addReaction.isPending || removeReaction.isPending}
                      >
                        {REACTIONS[reaction].emoji}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={8}>
                      {REACTIONS[reaction].label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </TooltipProvider>

      <SignInPromptDialog
        open={showSignInDialog}
        onOpenChange={setShowSignInDialog}
        title="Sign in to react"
        description="Join SkillMatch to interact with company posts and discover opportunities that match your skills."
      />
    </>
  );
}
