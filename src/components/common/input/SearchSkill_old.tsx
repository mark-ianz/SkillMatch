"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skill } from "@/types/skill.types";
import { useSearchSkills } from "@/hooks/query/useSkills";
import useDebounce from "@/hooks/useDebounce";
import LoadingGeneric from "@/components/global/LoadingGeneric";
import { toast } from "sonner";
import useApplicantProfileStore from "@/store/onboarding/applicant.onboarding.store";

const MAXIMUM_SKILLS = parseInt(
  process.env.NEXT_PUBLIC_MAXIMUM_SKILLS as string
);

export default function SearchSkill() {
  const skills = useApplicantProfileStore((state) => state.skills);
  const addSkill = useApplicantProfileStore((state) => state.addSkill);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Skill[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useSearchSkills(debouncedSearchQuery);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      setResults(data?.skills || []);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedSearchQuery, data]);

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

  // Handle selecting a skill
  function handleSelectSkill(skill: Skill) {
    // Check if skill already added
    if (skills.find((s) => s.skill_id === skill.skill_id)) {
      toast("Skill already added. Please select a different skill.", {
        style: { backgroundColor: "#fee2e2", color: "#b91c1c" },
        duration: 4000,
      });
      return;
    }

    if (skills.length >= MAXIMUM_SKILLS) {
      toast(`Maximum of ${MAXIMUM_SKILLS} skills allowed.`, {
        style: { backgroundColor: "#fee2e2", color: "#b91c1c" },
        duration: 4000,
      });
      return;
    }

    console.log("Selected skill:", skill);
    addSkill(skill);
    setIsOpen(false);
    setSearchQuery("");
  }

  return (
    <div ref={containerRef} className="w-full max-w-md">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setIsOpen(true);
                }
              }}
              className="pl-9"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-[300px] overflow-y-auto">
            {isLoading && (
              <div className="flex items-center justify-center h-[100px]">
                <LoadingGeneric className="w-6 h-6" />
              </div>
            )}
            {results.length > 0 && (
              <div className="py-2">
                {results.map((skill) => (
                  <button
                    key={skill.skill_id}
                    onClick={() => handleSelectSkill(skill)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {skill.skill_name}
                  </button>
                ))}
              </div>
            )}
            {results.length === 0 && !isLoading && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No skills found
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
