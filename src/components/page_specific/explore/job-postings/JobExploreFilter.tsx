"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Filter, X, ChevronDown, ChevronUp, Search } from "lucide-react";
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
import cityMunicipalityData from "@/data/city_municipality.json";

interface JobExploreFilterProps {
  className?: string;
}

const COURSES = getAllCourses() as string[];
const INDUSTRIES = getAllIndustry() as string[];
const JOB_CATEGORIES = getAllJobCategories(false, true) as string[];
const LOCATION_OPTIONS = Object.keys(cityMunicipalityData).sort();
const WORK_ARRANGEMENT_OPTIONS = ["Remote", "On-site", "Hybrid"];

const MAX_VISIBLE_ITEMS = 6;

interface FilterSectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (value: string) => void;
  searchable?: boolean;
  formatLabel?: (item: string) => string;
}

function FilterSection({
  title,
  items,
  selectedItems,
  onToggle,
  searchable = false,
  formatLabel = (item) => item,
}: FilterSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayItems = showAll
    ? filteredItems
    : filteredItems.slice(0, MAX_VISIBLE_ITEMS);
  const hasMore = filteredItems.length > MAX_VISIBLE_ITEMS;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">{title}</h4>

      {searchable && (
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
      )}

      <div className={cn("relative", items.length > MAX_VISIBLE_ITEMS && !showAll && "max-h-[240px] overflow-hidden")}>
        <div className="space-y-1">
          {displayItems.map((item, index) => (
            <Label
              key={item + index}
              htmlFor={`${title}-${item}`}
              className="flex align-top gap-2 justify-start font-normal cursor-pointer leading-tight py-1 hover:bg-accent/50 rounded px-1 transition-colors"
            >
              <Checkbox
                id={`${title}-${item}`}
                checked={selectedItems.includes(item)}
                onCheckedChange={() => onToggle(item)}
              />
              <span className="text-sm">{formatLabel(item)}</span>
            </Label>
          ))}
        </div>
        
        {!showAll && hasMore && !searchQuery && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background to-transparent pointer-events-none" />
        )}
      </div>

      {hasMore && !searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="w-full text-xs h-7 text-primary hover:text-primary"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-3 h-3 mr-1" />
              View Less
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 mr-1" />
              View More ({filteredItems.length - MAX_VISIBLE_ITEMS})
            </>
          )}
        </Button>
      )}
    </div>
  );
}

export function JobExploreFilter({ className }: JobExploreFilterProps) {
  const searchParams = useSearchParams();
  const exploreType = useExploreStore((state) => state.exploreType);
  const setExploreType = useExploreStore((state) => state.setExploreType);
  const router = useRouter();

  const [filters, setFilters] = useState<JobExploreFilters>({
    courses: searchParams.getAll("course") || [],
    locations: searchParams.getAll("location") || [],
    workArrangement: searchParams.getAll("arrangement") || [],
    industries: searchParams.getAll("industry") || [],
    jobCategories: searchParams.getAll("jobCategory") || [],
  });

  useEffect(() => {
    setExploreType(exploreType);
  }, [exploreType, setExploreType]);

  // Automatically apply filters when they change
  useEffect(() => {
    const params = new URLSearchParams();

    if (exploreType === "companies") {
      filters.industries.forEach((i) => params.append("industry", i));
    } else {
      filters.courses.forEach((p) => params.append("course", p));
      filters.locations.forEach((l) => params.append("location", l));
      filters.workArrangement.forEach((w) => params.append("arrangement", w));
      filters.industries.forEach((i) => params.append("industry", i));
      filters.jobCategories.forEach((j) => params.append("jobCategory", j));
    }

    const existingSearch = searchParams.get("search");
    if (existingSearch) {
      params.append("search", existingSearch);
    }

    const queryString = params.toString();
    router.push(
      `/explore/${exploreType}${queryString ? `?${queryString}` : ""}`,
      { scroll: false }
    );
  }, [filters, exploreType, router, searchParams]);

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

  const handleReset = () => {
    setFilters({
      courses: [],
      locations: [],
      workArrangement: [],
      industries: [],
      jobCategories: [],
    });
  };

  const hasActiveFilters =
    filters.courses.length > 0 ||
    filters.locations.length > 0 ||
    filters.workArrangement.length > 0 ||
    filters.industries.length > 0 ||
    filters.jobCategories.length > 0;

  return (
    <Card className={cn("p-6 w-full", className)}>
      <div className="flex items-center justify-between mb-4">
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

      <div className="space-y-4">
        {exploreType === "companies" ? (
          <FilterSection
            title="Industry"
            items={INDUSTRIES}
            selectedItems={filters.industries}
            onToggle={(value) => handleFilterChange("industries", value)}
            searchable
          />
        ) : (
          <>
            <FilterSection
              title="Courses"
              items={COURSES}
              selectedItems={filters.courses}
              onToggle={(value) => handleFilterChange("courses", value)}
              searchable
              formatLabel={(course) =>
                course.replace("Bachelor of Science in ", "BS ")
              }
            />

            <Separator />

            <FilterSection
              title="Location"
              items={LOCATION_OPTIONS}
              selectedItems={filters.locations}
              onToggle={(value) => handleFilterChange("locations", value)}
              searchable
            />

            <Separator />

            <FilterSection
              title="Work Arrangement"
              items={WORK_ARRANGEMENT_OPTIONS}
              selectedItems={filters.workArrangement}
              onToggle={(value) => handleFilterChange("workArrangement", value)}
            />

            <Separator />

            <FilterSection
              title="Industry"
              items={INDUSTRIES}
              selectedItems={filters.industries}
              onToggle={(value) => handleFilterChange("industries", value)}
              searchable
            />

            <Separator />

            <FilterSection
              title="Job Categories"
              items={JOB_CATEGORIES}
              selectedItems={filters.jobCategories}
              onToggle={(value) => handleFilterChange("jobCategories", value)}
              searchable
            />
          </>
        )}
      </div>
    </Card>
  );
}
