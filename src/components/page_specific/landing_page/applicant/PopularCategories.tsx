"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { usePopularCategories } from "@/hooks/query/usePopularCategories";

export default function PopularCategories() {
  const router = useRouter();
  const { data: popularCategories = [], isLoading } = usePopularCategories();

  const handleCategoryClick = (category: string) => {
    router.push(`/explore/job-postings?jobCategory=${encodeURIComponent(category)}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2" role="list" aria-label="Popular job categories">
      <span className="text-sm text-muted-foreground">Popular:</span>
      {isLoading ? (
        <>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-24 bg-muted animate-pulse rounded-full"
            />
          ))}
        </>
      ) : popularCategories.length > 0 ? (
        popularCategories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
            role="listitem"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Badge>
        ))
      ) : (
        <span className="text-sm text-muted-foreground italic">
          No popular categories yet
        </span>
      )}
    </div>
  );
}
