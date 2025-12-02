"use client";

import { notFound, useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import JobPostingForm from "@/components/page_specific/job_postings/JobPostForm";
import { useJobPost } from "@/hooks/query/useJobPosts";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useJobPostingStore } from "@/store/JobPostingStore";
import { GoBackButton } from "@/components/common/button/GoBackButton";

export default function EditJobPostPage() {
  const params = useParams();
  const job_post_id = params.job_posts_id as string;
  const { setFormData } = useJobPostingStore();

  const { data: jobPost, isLoading, error } = useJobPost(job_post_id);

  // Pre-fill form with existing data
  useEffect(() => {
    if (jobPost) {
      setFormData({
        job_title: jobPost.job_title,
        courses_required: jobPost.courses_required,
        job_categories: jobPost.job_categories,
        available_positions: jobPost.available_positions,
        job_overview: jobPost.job_overview,
        job_responsibilities: jobPost.job_responsibilities,
        preferred_qualifications: jobPost.preferred_qualifications || "",
        work_arrangement: jobPost.work_arrangement,
        soft_skills: jobPost.soft_skills,
        technical_skills: jobPost.technical_skills,
        street_name: jobPost.street_name,
        barangay: jobPost.barangay,
        city_municipality: jobPost.city_municipality,
        postal_code: jobPost.postal_code,
      });
    }
  }, [jobPost, setFormData]);

  if (isLoading) {
    return (
      <MainLayout
        className="items-center w-full"
        wrapperClassName="w-full py-0"
      >
        <div className="flex flex-col container max-w-3xl">
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </MainLayout>
    );
  }

  if (error || !jobPost) {
    notFound();
  }

  return (
    <MainLayout className="items-center w-full" wrapperClassName="w-full py-0">
      <div className="flex flex-col container max-w-3xl">
        <GoBackButton />
        <div className="mt-4 mb-8">
          <h1 className="text-3xl font-bold">Edit Job Post</h1>
          <p className="text-muted-foreground mt-2">
            Update your job posting details
          </p>
        </div>
        <JobPostingForm isEditMode jobPostId={job_post_id} />
      </div>
    </MainLayout>
  );
}
