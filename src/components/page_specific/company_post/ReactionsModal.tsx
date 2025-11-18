"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactionType } from "@/types/company_post.types";
import { useReactions } from "@/hooks/query/useReactions";
import LoadingGeneric from "@/components/global/LoadingGeneric";

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
  post_id: string;
}

export function ReactionsModal({
  open,
  onOpenChange,
  post_id,
}: ReactionsModalProps) {
  const { data: reactionData, isLoading } = useReactions(post_id);

  const reactions = reactionData?.counts || {};
  const totalReactions = reactionData?.totalReactions || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reactions ({totalReactions})</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingGeneric />
          </div>
        ) : (
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
            {totalReactions === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No reactions yet
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
