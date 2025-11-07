"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostReactions, ReactionType } from "@/types/company_post.types";

const REACTIONS: Record<ReactionType, { emoji: string; label: string }> = {
  like: { emoji: "👍", label: "Like" },
  insightful: { emoji: "💡", label: "Insightful" },
  supportive: { emoji: "🤝", label: "Supportive" },
  exciting: { emoji: "🎉", label: "Exciting" },
  interested: { emoji: "👀", label: "Interested" },
  curious: { emoji: "🤔", label: "Curious" },
};

interface ReactionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reactions: PostReactions;
}

export function ReactionsModal({
  open,
  onOpenChange,
  reactions,
}: ReactionsModalProps) {
  const totalReactions = Object.values(reactions).reduce(
    (a, b) => a + (b || 0),
    0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reactions ({totalReactions})</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {(Object.keys(REACTIONS) as ReactionType[]).map((reactionType) => {
            const count = reactions[reactionType] || 0;
            if (count === 0) return null;

            return (
              <div
                key={reactionType}
                className="flex items-center justify-between p-3 rounded-lg bg-muted"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {REACTIONS[reactionType].emoji}
                  </span>
                  <span className="font-medium">
                    {REACTIONS[reactionType].label}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground font-semibold">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
