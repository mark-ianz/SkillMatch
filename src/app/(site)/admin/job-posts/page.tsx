import { Suspense } from "react";
import JobPostsTable from "@/components/admin/JobPostsTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminJobPostsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Posts Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor all job postings
        </p>
      </div>

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
    </div>
  );
}
