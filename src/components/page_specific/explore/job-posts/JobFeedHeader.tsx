"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useExploreStore } from "@/store/ExploreStore";
import useDebounce from "@/hooks/useDebounce";

export function JobFeedHeader() {
  const exploreType = useExploreStore((state) => state.exploreType);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchQuery, 500); // 500ms delay
  const isInitialMount = useRef(true);

  // Sync search query with URL when pathname changes (tab switch)
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [pathname, searchParams]);

  // Auto-search when debounced value changes
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Build URL with current pathname (don't rely on exploreType)
    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    } else {
      params.delete("search");
    }
    
    const queryString = params.toString();
    const newUrl = `${pathname}${queryString ? `?${queryString}` : ""}`;
    
    router.push(newUrl, { scroll: false });
  }, [debouncedSearch, pathname, router, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is now handled by debounce effect
  };

  const handleTabChange = (newFeedType: string) => {
    isInitialMount.current = true; // Prevent search trigger on tab change
    router.push(`/explore/${newFeedType}`);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={
            exploreType === "job-posts"
              ? "Search job titles or companies..."
              : "Search companies..."
          }
          className="pl-10 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* Feed Type Tabs */}
      <Tabs
        value={exploreType}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="job-posts">OJT Posts</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
