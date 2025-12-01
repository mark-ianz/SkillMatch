"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore/job-postings?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/explore/job-postings");
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card border rounded-lg shadow-lg">
        <div className="flex items-center flex-1 gap-2 px-3">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title or skills..."
            className="border-0 shadow-none focus-visible:ring-0 px-0"
            aria-label="Search jobs"
          />
        </div>
        <Button 
          type="submit"
          className="bg-skillmatch-primary-green text-skillmatch-light hover:bg-skillmatch-primary-green/90"
        >
          Search Jobs
        </Button>
      </div>
    </form>
  );
}
