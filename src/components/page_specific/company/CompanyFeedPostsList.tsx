"use client";

import { useState } from "react";
import { useCompanyOwnPosts, useDeleteCompanyPost } from "@/hooks/query/useCompanyPosts";
import useRequireCompany from "@/hooks/useRequireCompany";
import { CompanyPost as CompanyPostType } from "@/types/company_post.types";
import { CompanyPost } from "@/components/page_specific/company_post/CompanyPost";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Heart, Trash2 } from "lucide-react";
import { EditCompanyPostDialog } from "./EditCompanyPostDialog";
import { ViewReactionsDialog } from "./ViewReactionsDialog";
import { CompanyPostSkeleton } from "@/components/common/skeleton/JobPostSkeleton";

export function CompanyFeedPostsList() {
  const company_id = useRequireCompany();
  const { data: posts, isLoading } = useCompanyOwnPosts(company_id);
  const deletePostMutation = useDeleteCompanyPost();

  const [editPost, setEditPost] = useState<CompanyPostType | null>(null);
  const [viewReactionsPost, setViewReactionsPost] = useState<CompanyPostType | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deletePostId && company_id) {
      deletePostMutation.mutate({
        post_id: deletePostId,
        company_id,
      });
      setDeletePostId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <CompanyPostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-medium text-muted-foreground">No posts yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first post to share with the community
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.post_id} className="relative">
            <CompanyPost post={post} />
            
            {/* Action buttons overlay */}
            <div className="flex items-center gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditPost(post)}
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewReactionsPost(post)}
                className="gap-2"
              >
                <Heart className="w-4 h-4" />
                View Reactions
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeletePostId(post.post_id)}
                className="gap-2 text-destructive hover:text-destructive ml-auto"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <EditCompanyPostDialog
        post={editPost}
        open={!!editPost}
        onOpenChange={(open) => !open && setEditPost(null)}
      />

      {/* View Reactions Dialog */}
      <ViewReactionsDialog
        post={viewReactionsPost}
        open={!!viewReactionsPost}
        onOpenChange={(open) => !open && setViewReactionsPost(null)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePostId} onOpenChange={(open) => !open && setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be undone and will
              remove all reactions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
