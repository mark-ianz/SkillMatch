"use client";

import MainLayout from "@/components/layout/MainLayout";
import CompanyPostForm from "@/components/page_specific/company_post/CompanyPostForm";
import React from "react";

export default function CreatePostPage() {
  return (
    <MainLayout className="items-center" wrapperClassName="w-full py-10">
      <div className="flex-col container max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Post</h1>
          <p className="text-muted-foreground mt-2">
            Create a new post for your company
          </p>
        </div>
        <CompanyPostForm />
      </div>
    </MainLayout>
  );
}
