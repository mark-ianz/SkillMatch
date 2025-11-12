"use client";
import { useEffect, useRef, useState } from "react";
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

// Mock data - replace with actual API call
const JOB_CATEGORIES = [
  { category_id: "1", category_name: "Information Technology" },
  { category_id: "2", category_name: "Web Development" },
  { category_id: "3", category_name: "Mobile Development" },
  { category_id: "4", category_name: "Data Science" },
  { category_id: "5", category_name: "Engineering" },
  { category_id: "6", category_name: "Business" },
  { category_id: "7", category_name: "Marketing" },
  { category_id: "8", category_name: "Design" },
];

interface SearchJobCategoryProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  maxCategories?: number;
}

export default function SearchJobCategory({
  selectedCategories,
  onCategoriesChange,
  maxCategories = 5,
}: SearchJobCategoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(JOB_CATEGORIES);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter results based on search query
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      const filtered = JOB_CATEGORIES.filter((cat) =>
        cat.category_name
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults(JOB_CATEGORIES);
      setIsOpen(false);
    }
  }, [debouncedSearchQuery]);

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
      onCategoriesChange(selectedCategories.filter((name) => name !== categoryName));
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
    onCategoriesChange(selectedCategories.filter((name) => name !== categoryName));
  }

  const selectedCategoryNames = selectedCategories;

  return (
    <div ref={containerRef} className="w-full">
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

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search job categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setIsOpen(true);
                }
              }}
              className="pl-9"
              disabled={selectedCategories.length >= maxCategories}
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
                {results.map((category) => (
                  <button
                    key={category.category_id}
                    onClick={() => handleSelectCategory(category.category_name)}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      selectedCategories.includes(category.category_name)
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {category.category_name}
                  </button>
                ))}
              </div>
            )}
            {results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No categories found
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
