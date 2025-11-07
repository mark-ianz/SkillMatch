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

const REACTIONS: Record<ReactionType, { emoji: string; label: string }> = {
  like: { emoji: "👍", label: "Like" },
  insightful: { emoji: "💡", label: "Insightful" },
  supportive: { emoji: "🤝", label: "Supportive" },
  exciting: { emoji: "🎉", label: "Exciting" },
  interested: { emoji: "👀", label: "Interested" },
  curious: { emoji: "🤔", label: "Curious" },
};

interface ReactionButtonProps {
  userReaction: ReactionType | null;
  onReact: (reaction: ReactionType | null) => void;
  totalReactions: number;
  onShowReactionsModal: () => void;
}

export function ReactionButton({
  userReaction,
  onReact,
  totalReactions,
  onShowReactionsModal,
}: ReactionButtonProps) {
  const [open, setOpen] = useState(false);

  const handleReactionClick = (reaction: ReactionType) => {
    if (userReaction === reaction) {
      onReact(null);
    } else {
      onReact(reaction);
    }
    setOpen(false);
  };

  return (
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
                onClick={() => handleReactionClick(userReaction)}
                className="gap-1 h-8 bg-skillmatch-muted-light/30"
              >
                <span className="text-lg">{REACTIONS[userReaction].emoji}</span>
                <span className="text-xs">{REACTIONS[userReaction].label}</span>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="h-8">
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
                      className="text-2xl rounded transition-transform duration-150 hover:scale-125 cursor-pointer p-1"
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
  );
}
