"use client";

import CompaniesTable from "@/components/admin/CompaniesTable";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function AdminCompaniesPage() {
  return (
    <div>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-2">Company Management</h1>
        <p className="text-muted-foreground">
          Review and manage company registrations and approvals
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Suspense fallback={<CompaniesSkeleton />}>
          <CompaniesTable />
        </Suspense>
      </motion.div>
    </div>
  );
}

function CompaniesSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
