"use client";

import { Suspense } from "react";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function AdminAnalyticsPage() {
  return (
    <div>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Platform statistics and insights
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Suspense
          fallback={
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[180px]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-[140px]" />
                <Skeleton className="h-[140px]" />
                <Skeleton className="h-[140px]" />
              </div>
              <Skeleton className="h-[400px]" />
            </div>
          }
        >
          <AnalyticsDashboard />
        </Suspense>
      </motion.div>
    </div>
  );
}
