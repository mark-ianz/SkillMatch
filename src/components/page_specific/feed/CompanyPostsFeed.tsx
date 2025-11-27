"use client";

import { useCompanyPostsFeed } from "@/hooks/query/useFeed";
import { CompanyPost } from "@/components/page_specific/company_post/CompanyPost";
import { FileText } from "lucide-react";
import { CompanyPostSkeleton } from "@/components/common/skeleton/JobPostSkeleton";

export function CompanyPostsFeed() {
  const { data: posts, isLoading, error } = useCompanyPostsFeed();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <CompanyPostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    console.log(error)
    return (
      <div className="text-center py-20">
        <FileText className="w-12 h-12 mx-auto mb-4 text-destructive/40" />
        <p className="text-destructive">Failed to load posts</p>
        <p className="text-sm text-muted-foreground mt-2">
          Please try again later
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
        <p className="text-lg font-medium text-muted-foreground">No posts yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Company posts will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {posts.map((post) => (
        <CompanyPost key={post.post_id} post={post} />
      ))}
    </div>
  );
}
