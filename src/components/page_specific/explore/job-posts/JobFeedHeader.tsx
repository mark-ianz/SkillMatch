"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useFeedStore } from "@/store/FeedStore";

export function JobFeedHeader() {
  const exploreType = useFeedStore((state) => state.exploreType);
  const searchParams = useSearchParams();
  
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preserve existing filter params
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    
    const queryString = params.toString();
    router.push(`/explore/${exploreType}${queryString ? `?${queryString}` : ""}`);
  };

  const handleTabChange = (newFeedType: string) => {
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
