"use client";

import MainLayout from "@/components/layout/MainLayout";
import JobPostingForm from "@/components/page_specific/job_post/JobPostForm";
import { SessionProvider } from "next-auth/react";

export default function PostJobPage() {
  return (
    <MainLayout className="items-center w-full" wrapperClassName="w-full py-0">
      <div className="flex flex-col container max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Post a Job</h1>
          <p className="text-muted-foreground mt-2">
            Create a new job posting for your company
          </p>
        </div>
        <JobPostingForm />
      </div>
    </MainLayout>
  );
}
