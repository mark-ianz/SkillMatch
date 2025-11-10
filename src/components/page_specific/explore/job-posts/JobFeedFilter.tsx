"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import { ExploreType, JobFeedFilters } from "@/types/job_feed.types";
import { cn, getAllCourses } from "@/lib/utils";

interface JobFeedFilterProps {
  exploreType: ExploreType;
  className?: string;
}

const COURSES = getAllCourses();

const LOCATION_OPTIONS = [
  "Quezon City",
  "Makati",
  "Taguig",
  "Paranaque",
  "Others",
];

const WORK_ARRANGEMENT_OPTIONS = ["Remote", "On-site", "Hybrid"];

export function JobFeedFilter({ exploreType, className }: JobFeedFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<JobFeedFilters>({
    courses: searchParams.getAll("course") || [],
    locations: searchParams.getAll("location") || [],
    workArrangement: searchParams.getAll("arrangement") || [],
    isPaid: searchParams.get("paid") === "true" ? true : undefined,
  });

  const handleFilterChange = (type: keyof JobFeedFilters, value: string) => {
    setFilters((prev) => {
      if (Array.isArray(prev[type])) {
        const array = prev[type] as string[];
        const updated = array.includes(value)
          ? array.filter((v) => v !== value)
          : [...array, value];
        return { ...prev, [type]: updated };
      }
      return prev;
    });
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    filters.courses.forEach((p) => params.append("course", p));
    filters.locations.forEach((l) => params.append("location", l));
    filters.workArrangement.forEach((w) => params.append("arrangement", w));
    if (filters.isPaid !== undefined)
      params.append("paid", String(filters.isPaid));

    const queryString = params.toString();
    router.push(
      `/explore/${exploreType}${queryString ? `?${queryString}` : ""}`
    );
  };

  const handleReset = () => {
    setFilters({
      courses: [],
      locations: [],
      workArrangement: [],
      isPaid: undefined,
    });
    router.push(`/explore/${exploreType}`);
  };

  const hasActiveFilters =
    filters.courses.length > 0 ||
    filters.locations.length > 0 ||
    filters.workArrangement.length > 0 ||
    filters.isPaid !== undefined;

  return (
    <Card className={cn("p-6 w-full", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs h-7"
          >
            <X className="w-3 h-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Courses Filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold">Courses</h4>
        <div className="space-y-2">
          {COURSES.map((course, index) => (
            <div
              key={course + index}
              className="flex align-top gap-2 justify-start"
            >
              <Checkbox
                id={`course-${course}`}
                checked={filters.courses.includes(course)}
                onCheckedChange={() => handleFilterChange("courses", course)}
              />
              <Label
                htmlFor={`course-${course}`}
                className="text-sm font-normal cursor-pointer leading-tight"
              >
                {course.replace("Bachelor of Science in ", "BS ")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="space-y-3 border-t pt-4">
        <h4 className="text-sm font-semibold">Location</h4>
        <div className="space-y-2">
          {LOCATION_OPTIONS.map((location) => (
            <div key={location} className="flex items-center gap-2">
              <Checkbox
                id={`location-${location}`}
                checked={filters.locations.includes(location)}
                onCheckedChange={() =>
                  handleFilterChange("locations", location)
                }
              />
              <Label
                htmlFor={`location-${location}`}
                className="text-sm font-normal cursor-pointer"
              >
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Work Arrangement Filter */}
      <div className="space-y-3 border-t pt-4">
        <h4 className="text-sm font-semibold">Work Arrangement</h4>
        <div className="space-y-2">
          {WORK_ARRANGEMENT_OPTIONS.map((arrangement) => (
            <div
              key={arrangement}
              className="flex items-center justify-start gap-2"
            >
              <Checkbox
                id={`arrangement-${arrangement}`}
                checked={filters.workArrangement.includes(arrangement)}
                onCheckedChange={() =>
                  handleFilterChange("workArrangement", arrangement)
                }
              />
              <Label
                htmlFor={`arrangement-${arrangement}`}
                className="text-sm font-normal cursor-pointer"
              >
                {arrangement}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <Button
        onClick={handleApplyFilters}
        className="w-full"
        disabled={!hasActiveFilters}
      >
        Apply Filters
      </Button>
    </Card>
  );
}
