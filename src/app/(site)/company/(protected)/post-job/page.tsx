"use client";

import { GoBackButton } from "@/components/common/button/GoBackButton";
import MainLayout from "@/components/layout/MainLayout";
import JobPostingForm from "@/components/page_specific/job_postings/JobPostForm";
import { motion } from "framer-motion";

export default function PostJobPage() {
  return (
    <MainLayout className="items-center w-full" wrapperClassName="w-full py-0">
      <div className="flex flex-col container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <GoBackButton />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Post a Job</h1>
          <p className="text-muted-foreground mt-2">
            Create a new job posting for your company
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <JobPostingForm />
        </motion.div>
      </div>
    </MainLayout>
  );
}
