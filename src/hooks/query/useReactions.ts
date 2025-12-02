import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ReactionType } from "@/types/company_post.types";

interface ReactionData {
  counts: Record<string, number>;
  totalReactions: number;
  userReaction: ReactionType | null;
}

// Get reactions for a post
export function useReactions(post_id: string) {
  return useQuery<ReactionData>({
    queryKey: ["reactions", post_id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/feed/company-posts/${post_id}/reactions`
      );
      return data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

// Add or update a reaction
export function useAddReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      post_id,
      reaction_type,
    }: {
      post_id: string;
      reaction_type: ReactionType;
    }) => {
      const { data } = await axios.post(
        `/api/feed/company-posts/${post_id}/reactions`,
        { reaction_type }
      );
      return data;
    },
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["reactions", variables.post_id] });

      // Snapshot the previous value
      const previousReactions = queryClient.getQueryData<ReactionData>(["reactions", variables.post_id]);

      // Optimistically update
      if (previousReactions) {
        queryClient.setQueryData<ReactionData>(["reactions", variables.post_id], {
          ...previousReactions,
          userReaction: variables.reaction_type,
        });
      }

      return { previousReactions };
    },
    onSuccess: (data, variables) => {
      // Update the cache with new reaction data from server
      queryClient.setQueryData<ReactionData>(
        ["reactions", variables.post_id],
        data
      );
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousReactions) {
        queryClient.setQueryData<ReactionData>(
          ["reactions", variables.post_id],
          context.previousReactions
        );
      }
    },
  });
}

// Remove a reaction
export function useRemoveReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ post_id }: { post_id: string }) => {
      const { data } = await axios.delete(
        `/api/feed/company-posts/${post_id}/reactions`
      );
      return data;
    },
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["reactions", variables.post_id] });

      // Snapshot the previous value
      const previousReactions = queryClient.getQueryData<ReactionData>(["reactions", variables.post_id]);

      // Optimistically update
      if (previousReactions) {
        queryClient.setQueryData<ReactionData>(["reactions", variables.post_id], {
          ...previousReactions,
          userReaction: null,
        });
      }

      return { previousReactions };
    },
    onSuccess: (data, variables) => {
      // Update the cache with new reaction data from server
      queryClient.setQueryData<ReactionData>(
        ["reactions", variables.post_id],
        data
      );
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousReactions) {
        queryClient.setQueryData<ReactionData>(
          ["reactions", variables.post_id],
          context.previousReactions
        );
      }
    },
  });
}
