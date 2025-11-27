import CompaniesTable from "@/components/admin/CompaniesTable";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminCompaniesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Company Management</h1>
        <p className="text-muted-foreground">
          Review and manage company registrations and approvals
        </p>
      </div>

      <Suspense fallback={<CompaniesSkeleton />}>
        <CompaniesTable />
      </Suspense>
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
