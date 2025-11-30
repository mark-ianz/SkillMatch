"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import { JobExploreFilters } from "@/types/job_explore.types";
import {
  cn,
  getAllCourses,
  getAllIndustry,
  getAllJobCategories,
} from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useExploreStore } from "@/store/ExploreStore";

interface JobExploreFilterProps {
  className?: string;
}

const COURSES = getAllCourses() as string[];
const INDUSTRIES = getAllIndustry() as string[];
const JOB_CATEGORIES = getAllJobCategories(false, true) as string[];

const LOCATION_OPTIONS = [
  "Quezon City",
  "Makati",
  "Taguig",
  "Paranaque",
  "Others",
];

const WORK_ARRANGEMENT_OPTIONS = ["Remote", "On-site", "Hybrid"];

export function JobExploreFilter({ className }: JobExploreFilterProps) {
  const searchParams = useSearchParams();
  const exploreType = useExploreStore((state) => state.exploreType);
  const setExploreType = useExploreStore((state) => state.setExploreType);


  useEffect(() => {
    // Sync URL exploreType with store
    setExploreType(exploreType);
    // TODO: Implement actual Explore filtering based on exploreType and filters
    console.log("Explore type:", exploreType);
    console.log("Search params:", Object.fromEntries(searchParams));
  }, [exploreType, searchParams, setExploreType]);

  const router = useRouter();
  const [filters, setFilters] = useState<JobExploreFilters>({
    courses: searchParams.getAll("course") || [],
    locations: searchParams.getAll("location") || [],
    workArrangement: searchParams.getAll("arrangement") || [],
    industries: searchParams.getAll("industry") || [],
    jobCategories: searchParams.getAll("jobCategory") || [],
    isPaid: searchParams.get("paid") === "true" ? true : undefined,
  });

  const handleFilterChange = (type: keyof JobExploreFilters, value: string) => {
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

    if (exploreType === "companies") {
      // For companies, only apply industry filter
      filters.industries.forEach((i) => params.append("industry", i));
    } else {
      // For job posts, apply all filters
      filters.courses.forEach((p) => params.append("course", p));
      filters.locations.forEach((l) => params.append("location", l));
      filters.workArrangement.forEach((w) => params.append("arrangement", w));
      filters.industries.forEach((i) => params.append("industry", i));
      filters.jobCategories.forEach((j) => params.append("jobCategory", j));
      if (filters.isPaid !== undefined)
        params.append("paid", String(filters.isPaid));
    }

    // Preserve search param
    const existingSearch = searchParams.get("search");
    if (existingSearch) {
      params.append("search", existingSearch);
    }

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
      industries: [],
      jobCategories: [],
      isPaid: undefined,
    });

    // Preserve search param on reset
    const existingSearch = searchParams.get("search");
    if (existingSearch) {
      router.push(`/explore/${exploreType}?search=${existingSearch}`);
    } else {
      router.push(`/explore/${exploreType}`);
    }
  };

  const hasActiveFilters =
    filters.courses.length > 0 ||
    filters.locations.length > 0 ||
    filters.workArrangement.length > 0 ||
    filters.industries.length > 0 ||
    filters.jobCategories.length > 0 ||
    filters.isPaid !== undefined;

  return (
    <Card className={cn("p-6 w-full gap-2", className)}>
      <div className="flex items-center justify-between mb-2">
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

      {/* Conditional rendering based on exploreType */}
      {exploreType === "companies" ? (
        // Company filters - Industry only
        <>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Industry</h4>
            <div className="space-y-0.5">
              {INDUSTRIES.map((industry) => (
                <div
                  key={industry}
                  className="flex align-top gap-2 justify-start"
                >
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={filters.industries.includes(industry)}
                    onCheckedChange={() =>
                      handleFilterChange("industries", industry)
                    }
                  />
                  <Label
                    htmlFor={`industry-${industry}`}
                    className="text-sm font-normal cursor-pointer leading-tight"
                  >
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Job post filters - All filters
        <>
          {/* Courses Filter */}
          <div className="space-y-1">
            <h4 className="text-sm font-bold">Courses</h4>
            <div className="space-y-0.5">
              {COURSES.map((course, index) => (
                <div
                  key={course + index}
                  className="flex align-top gap-2 justify-start"
                >
                  <Checkbox
                    id={`course-${course}`}
                    checked={filters.courses.includes(course)}
                    onCheckedChange={() =>
                      handleFilterChange("courses", course)
                    }
                  />
                  <Label
                    htmlFor={`course-${course}`}
                    className="font-normal cursor-pointer leading-tight"
                  >
                    {course.replace("Bachelor of Science in ", "BS ")}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Location Filter */}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Location</h4>
            <div className="space-y-0.5">
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
                    className="font-normal cursor-pointer"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Work Arrangement Filter */}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Work Arrangement</h4>
            <div className="space-y-0.5">
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
                    className="font-normal cursor-pointer"
                  >
                    {arrangement}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Industry Filter */}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Industry</h4>
            <div className="space-y-0.5">
              {INDUSTRIES.map((industry) => (
                <div
                  key={industry}
                  className="flex align-top gap-2 justify-start"
                >
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={filters.industries.includes(industry)}
                    onCheckedChange={() =>
                      handleFilterChange("industries", industry)
                    }
                  />
                  <Label
                    htmlFor={`industry-${industry}`}
                    className="text-sm font-normal cursor-pointer leading-tight"
                  >
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Job Categories Filter */}
          <div className="space-y-1 ">
            <h4 className="text-sm font-semibold">Job Categories</h4>
            <ScrollArea className="h-48">
              <div className="space-y-0.5">
                {JOB_CATEGORIES.map((category) => (
                  <div
                    key={category}
                    className="flex align-top items-center justify-start gap-2"
                  >
                    <Checkbox
                      id={`jobCategory-${category}`}
                      checked={filters.jobCategories.includes(category)}
                      onCheckedChange={() =>
                        handleFilterChange("jobCategories", category)
                      }
                    />
                    <Label
                      htmlFor={`jobCategory-${category}`}
                      className="font-normal cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}

      {/* Apply Button */}
      <Button
        onClick={handleApplyFilters}
        className="w-full mt-2"
        disabled={!hasActiveFilters}
      >
        Apply Filters
      </Button>
    </Card>
  );
}
