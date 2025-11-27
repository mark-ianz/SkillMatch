import { Suspense } from "react";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminAnalyticsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Platform statistics and insights
        </p>
      </div>

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
    </div>
  );
}
