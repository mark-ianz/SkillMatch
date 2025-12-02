import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/components/layout/MainLayout";

export default function Loading() {
  return (
    <MainLayout className="items-center" wrapperClassName="w-full">
      <div className="gap-10 flex flex-col items-center container max-w-5xl">
        <div className="space-y-4 px-4 w-full">
          {/* Back Button Skeleton */}
          <Skeleton className="h-10 w-24" />

          {/* Company Post Skeleton */}
          <Card className="w-full h-fit shadow-sm">
            <CardHeader className="flex pb-3">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-7 w-3/4" />
                {/* Content lines */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>

              {/* Cover Image */}
              <Skeleton className="w-full h-96 rounded-lg" />

              {/* Reaction and Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <Skeleton className="h-9 w-32" />
                <div className="ml-auto flex items-center gap-1">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Post Suggestions Section Skeleton */}
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between px-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-8 w-28" />
          </div>

          <ScrollArea className="h-96">
            <div className="grid grid-cols-1 gap-4 py-1 px-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="w-full shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-0">
                    <Skeleton className="h-6 w-2/3" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <Skeleton className="w-full h-48 rounded-lg" />
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Skeleton className="h-8 w-28" />
                      <div className="ml-auto">
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </MainLayout>
  );
}
