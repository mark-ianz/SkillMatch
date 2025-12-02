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
  const { data: session, status: sessionStatus } = useSession();
  
  const { data: reactionData, isLoading } = useReactions(post_id);
  const addReaction = useAddReaction();
  const removeReaction = useRemoveReaction();

  const userReaction = reactionData?.userReaction || null;
  const totalReactions = reactionData?.totalReactions || 0;
  const reactionCounts = reactionData?.counts || {};

  // Get top 2 most popular reactions
  const topReactions = Object.entries(reactionCounts)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 2)
    .map(([type]) => type as ReactionType);

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

  const isUpdating = addReaction.isPending || removeReaction.isPending;

  // Get role-based color classes
  const getReactionColors = () => {
    if (!session?.user?.role_id) {
      return {
        bg: "bg-primary/10",
        bgHover: "hover:bg-primary/20",
        text: "text-primary",
        ring: "ring-primary/30",
      };
    }

    const roleId = session.user.role_id;
    
    if (roleId === 4) {
      // Company - Blue
      return {
        bg: "bg-skillmatch-primary-blue/10",
        bgHover: "hover:bg-skillmatch-primary-blue/20",
        text: "text-skillmatch-primary-blue",
        ring: "ring-skillmatch-primary-blue/30",
      };
    } else if (roleId === 3) {
      // Applicant - Green
      return {
        bg: "bg-skillmatch-primary-green/10",
        bgHover: "hover:bg-skillmatch-primary-green/20",
        text: "text-skillmatch-primary-green",
        ring: "ring-skillmatch-primary-green/30",
      };
    } else {
      // Admin or others - Grayscale
      return {
        bg: "bg-gray-200",
        bgHover: "hover:bg-gray-300",
        text: "text-gray-700",
        ring: "ring-gray-400/30",
      };
    }
  };

  const colors = getReactionColors();

  if (isLoading || sessionStatus === "loading") {
    return (
      <Button variant="ghost" size="sm" className="h-9" disabled>
        <span className="text-lg">👍</span>
        <span className="text-xs ml-1">Like</span>
      </Button>
    );
  }

  return (
    <>
      <TooltipProvider>
        <div className="flex items-center gap-1">
          {/* Reaction count with top 2 emojis */}
          {totalReactions > 0 && (
            <button
              onClick={onShowReactionsModal}
              className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center -space-x-1">
                {topReactions.map((reaction) => (
                  <span
                    key={reaction}
                    className="text-sm bg-background rounded-full border border-border"
                  >
                    {REACTIONS[reaction].emoji}
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {totalReactions}
              </span>
            </button>
          )}

          {/* React button with popover */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              {userReaction ? (
                <Button
                  variant="secondary"
                  size="sm"
                  className={`gap-1 h-9 ${colors.bg} ${colors.bgHover} ${colors.text}`}
                  disabled={isUpdating}
                >
                  <span className="text-lg">{REACTIONS[userReaction].emoji}</span>
                  <span className="text-xs font-medium">{REACTIONS[userReaction].label}</span>
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 h-9 hover:bg-muted/50"
                  disabled={isUpdating}
                >
                  <span className="text-lg">👍</span>
                  <span className="text-xs font-medium">Like</span>
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
                        className={`text-2xl rounded transition-all duration-150 hover:scale-125 cursor-pointer p-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                          userReaction === reaction 
                            ? `${colors.bg} scale-110 ring-2 ${colors.ring}` 
                            : ""
                        }`}
                        disabled={isUpdating}
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
