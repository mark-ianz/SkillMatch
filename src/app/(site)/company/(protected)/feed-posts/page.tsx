"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CompanyFeedPostsList } from "@/components/page_specific/company/CompanyFeedPostsList";

export default function CompanyFeedPostsPage() {
  return (
    <MainLayout className="items-center pb-20" wrapperClassName="p-4">
      <div className="container max-w-7xl mt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Feed Posts</h1>
            <p className="text-muted-foreground">
              Manage your company feed posts and track engagement
            </p>
          </div>
          <Link href="/company/create-post">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Create New Post
            </Button>
          </Link>
        </div>

        {/* Posts List */}
        <CompanyFeedPostsList />
      </div>
    </MainLayout>
  );
}
