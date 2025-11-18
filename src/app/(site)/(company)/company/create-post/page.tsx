"use client";

import QueryClientProviderWrapper from "@/components/providers/QueryClientProviderWrapper";
import MainLayout from "@/components/layout/MainLayout";
import CompanyPostForm from "@/components/page_specific/company_post/CompanyPostForm";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function CreatePostPage() {
  return (
    <MainLayout className="items-center">
      <div className="flex-col w-full max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Post</h1>
          <p className="text-muted-foreground mt-2">
            Create a new post for your company
          </p>
        </div>
        <SessionProvider>
          <QueryClientProviderWrapper>
            <CompanyPostForm />
          </QueryClientProviderWrapper>
        </SessionProvider>
      </div>
    </MainLayout>
  );
}
