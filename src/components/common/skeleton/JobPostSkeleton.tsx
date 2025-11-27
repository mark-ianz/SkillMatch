import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobPostCardSkeleton() {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Company Logo Skeleton */}
          <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />

          <div className="flex-1 space-y-3">
            {/* Job Title Skeleton */}
            <Skeleton className="h-5 w-3/4" />

            {/* Company Name Skeleton */}
            <Skeleton className="h-4 w-1/2" />

            {/* Details Row Skeleton */}
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Skills/Badges Skeleton */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function JobPostFullInfoSkeleton() {
  return (
    <Card className="border-1 shadow-sm p-6 w-full">
      <div className="space-y-6">
        {/* Company Logo and Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex gap-4 flex-1">
            <Skeleton className="w-20 h-20 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-3">
              {/* Job Title */}
              <Skeleton className="h-8 w-3/4" />
              {/* Company Name */}
              <Skeleton className="h-5 w-1/2" />
              {/* Location */}
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Job Details Section */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Skills/Requirements Section */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-32" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Qualifications Section */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-36" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Apply Button */}
        <Skeleton className="h-11 w-full" />
      </div>
    </Card>
  );
}

export function CompanyPostSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        {/* Header with avatar and company info */}
        <div className="flex items-start gap-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Post content */}
        <div className="space-y-3 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Post image */}
        <Skeleton className="h-64 w-full rounded-lg mb-4" />

        {/* Footer actions */}
        <div className="flex items-center gap-6">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CompanyCardSkeleton() {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Company Logo Skeleton */}
          <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />

          <div className="flex-1 space-y-3">
            {/* Company Name Skeleton */}
            <Skeleton className="h-5 w-2/3" />

            {/* Industry Badges Skeleton */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
