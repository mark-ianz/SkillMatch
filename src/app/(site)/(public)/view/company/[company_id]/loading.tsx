import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <MainLayout className="items-center">
      <div className="gap-10 flex flex-col items-center w-full">
        {/* Back Button & Profile Skeleton */}
        <div className="space-y-4 px-4 w-full max-w-5xl">
          {/* Back Button */}
          <Skeleton className="h-10 w-24" />

          {/* Company Profile Card */}
          <Card className="p-10 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                {/* Square Company Logo */}
                <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />

                {/* Company Name and Actions */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Skeleton className="h-8 w-64" />
                    <div className="flex gap-2 flex-shrink-0">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                  </div>

                  {/* Company Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Cover Image */}
              <Skeleton className="w-full h-64 rounded-lg" />

              <Separator />

              {/* About Section */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>

              <Separator />

              {/* Mission */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              <Separator />

              {/* Vision */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>

              <Separator />

              {/* Industry */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-48" />
              </div>

              <Separator />

              {/* Social Media */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-32" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Job Posts Section Skeleton */}
        <div className="space-y-4 grow w-full">
          <div className="flex items-center justify-between px-4">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-8 w-28" />
          </div>

          <ScrollArea className="h-96">
            <div className="grid grid-cols-1 gap-4 py-1 px-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="space-y-3">
                    {/* Badges */}
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-5 w-24" />
                    </div>

                    <div className="flex gap-4">
                      {/* Company Logo */}
                      <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />

                      {/* Job Info */}
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex gap-2 items-center">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-4 w-40" />
                        </div>
                      </div>

                      {/* Action Button */}
                      <Skeleton className="h-9 w-9 rounded-md flex-shrink-0" />
                    </div>

                    <Separator />

                    {/* Job Categories */}
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-28" />
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-18" />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>

                    <Separator />

                    {/* Footer Info */}
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </MainLayout>
  );
}
