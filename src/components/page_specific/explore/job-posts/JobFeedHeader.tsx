"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useFeedStore } from "@/store/FeedStore";

export function JobFeedHeader() {
  const feedType = useFeedStore((state) => state.feedType);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/feed/${feedType}?search=${encodeURIComponent(searchQuery)}`
      );
    }
  };

  const handleTabChange = (newFeedType: string) => {
    router.push(`/feed/${newFeedType}`);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={
            feedType === "job-posts"
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
        value={feedType}
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
