"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CompanyPost } from "@/types/company_post.types";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ThumbsUp, Smile, Star, Target } from "lucide-react";

interface ViewReactionsDialogProps {
  post: CompanyPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Reaction {
  reaction_type: string;
  created_at: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
  company_id?: string;
  company_name?: string;
  company_image?: string;
}

const reactionIcons: Record<string, React.ReactNode> = {
  love: <Heart className="w-4 h-4 text-red-500" />,
  like: <ThumbsUp className="w-4 h-4 text-blue-500" />,
  celebrate: <Star className="w-4 h-4 text-yellow-500" />,
  support: <Smile className="w-4 h-4 text-green-500" />,
  insightful: <Target className="w-4 h-4 text-purple-500" />,
};

export function ViewReactionsDialog({ post, open, onOpenChange }: ViewReactionsDialogProps) {
  const { data: reactions, isLoading } = useQuery({
    queryKey: ["post-reactions", post?.post_id],
    queryFn: async () => {
      if (!post?.post_id) return [];
      const { data } = await api.get<{ reactions: Reaction[] }>(
        `/feed/reactions/${post.post_id}`
      );
      return data.reactions;
    },
    enabled: !!post && open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post Reactions</DialogTitle>
          <DialogDescription>
            See who reacted to your post
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </>
          ) : reactions && reactions.length > 0 ? (
            reactions.map((reaction, index) => {
              const isUser = !!reaction.user_id;
              const name = isUser
                ? `${reaction.first_name} ${reaction.last_name}`
                : reaction.company_name;
              const image = isUser ? reaction.profile_picture : reaction.company_image;
              const initials = isUser
                ? `${reaction.first_name?.[0]}${reaction.last_name?.[0]}`
                : reaction.company_name?.[0];

              return (
                <div key={index} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={image || undefined} alt={name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {reactionIcons[reaction.reaction_type]}
                      <span className="capitalize">{reaction.reaction_type}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No reactions yet</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
