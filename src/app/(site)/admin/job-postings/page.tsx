"use client";

import { Suspense } from "react";
import JobPostsTable from "@/components/admin/JobPostsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function AdminJobPostsPage() {
  return (
    <div>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">Job Posts Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor all job postings
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="border rounded-lg p-4">
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </div>
          }
        >
          <JobPostsTable />
        </Suspense>
      </motion.div>
    </div>
  );
}
