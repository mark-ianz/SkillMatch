"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import INDUSTRY_CATEGORIES from "@/data/industry_categories.json";

interface SearchJobCategoryProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  maxCategories?: number;
  companyIndustries: string[]; // Company's selected industries
}

export default function SearchJobCategory({
  selectedCategories,
  onCategoriesChange,
  maxCategories = 5,
  companyIndustries,
}: SearchJobCategoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get all job categories from the company's industries
  const availableCategories = useMemo(() => {
    const categories: string[] = [];
    
    companyIndustries.forEach((industry) => {
      const industryData = INDUSTRY_CATEGORIES.find(
        (item) => item.industry === industry
      );
      if (industryData) {
        categories.push(...industryData.job_categories);
      }
    });

    // Remove duplicates and sort alphabetically
    return [...new Set(categories)].sort();
  }, [companyIndustries]);

  const [results, setResults] = useState<string[]>(availableCategories);

  // Update results when available categories change
  useEffect(() => {
    setResults(availableCategories);
  }, [availableCategories]);

  // Filter results based on search query
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      const filtered = availableCategories.filter((category) =>
        category.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults(availableCategories);
      setIsOpen(false);
    }
  }, [debouncedSearchQuery, availableCategories]);

  // Handle click outside to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSelectCategory(categoryName: string) {
    if (selectedCategories.includes(categoryName)) {
      onCategoriesChange(
        selectedCategories.filter((name) => name !== categoryName)
      );
    } else {
      if (selectedCategories.length >= maxCategories) {
        return;
      }
      onCategoriesChange([...selectedCategories, categoryName]);
    }
    setIsOpen(false);
    setSearchQuery("");
  }

  function handleRemoveCategory(categoryName: string) {
    onCategoriesChange(
      selectedCategories.filter((name) => name !== categoryName)
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && !selectedCategories.includes(results[0])) {
        handleSelectCategory(results[0]);
      }
    }
  }

  const selectedCategoryNames = selectedCategories;

  return (
    <div ref={containerRef} className="w-full">
      {selectedCategoryNames.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedCategoryNames.map((name, idx) => (
            <Badge key={idx} variant="secondary" className="gap-1">
              {name}
              <button
                onClick={() => handleRemoveCategory(selectedCategories[idx])}
                className="ml-1 hover:bg-muted-foreground/20 rounded"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={
                availableCategories.length === 0
                  ? "No categories available - set company industries first"
                  : "Search job categories..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setIsOpen(true);
                }
              }}
              className="pl-9"
              disabled={
                selectedCategories.length >= maxCategories ||
                availableCategories.length === 0
              }
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-[300px] overflow-y-auto">
            {results.length > 0 && (
              <div className="py-2">
                {results.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectCategory(category)}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      selectedCategories.includes(category)
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
            {results.length === 0 && availableCategories.length > 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No categories found
              </div>
            )}
            {availableCategories.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No job categories available. Please set your company industries
                in settings first.
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
