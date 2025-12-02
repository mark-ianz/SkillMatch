"use client";

import MainLayout from "@/components/layout/MainLayout";
import CompanyPostForm from "@/components/page_specific/company_post/CompanyPostForm";
import { motion } from "framer-motion";
import React from "react";

export default function CreatePostPage() {
  return (
    <MainLayout className="items-center" wrapperClassName="w-full py-10">
      <div className="flex-col container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Create Post</h1>
          <p className="text-muted-foreground mt-2">
            Create a new post for your company
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <CompanyPostForm />
        </motion.div>
      </div>
    </MainLayout>
  );
}
