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
import { useSearchSkills } from "@/hooks/query/useSkills";
import { useCreateSkill } from "@/hooks/query/useCreateSkill";
import { Skill } from "@/types/skill.types";
import { Button } from "@/components/ui/button";

interface SearchSkillProps {
  selectedSkills?: string[]; // array of skill names
  onSkillsChange?: (skills: string[]) => void;
  maxSkills?: number;
  skillType?: "technical" | "soft";
}

export default function SearchSkill({
  selectedSkills = [],
  onSkillsChange,
  maxSkills = 10,
  skillType = "technical",
}: SearchSkillProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Skill[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useSearchSkills(debouncedSearchQuery);
  const createSkill = useCreateSkill();

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

  async function handleSelectSkill(skill: Skill) {
    // we store skill names in the job post model
    if (selectedSkills.includes(skill.skill_name)) {
      onSkillsChange?.(selectedSkills.filter((s) => s !== skill.skill_name));
      setIsOpen(false);
      setSearchQuery("");
      return;
    }

    if (selectedSkills.length >= maxSkills) {
      return;
    }

    onSkillsChange?.([...selectedSkills, skill.skill_name]);
    setIsOpen(false);
    setSearchQuery("");
  }

  async function handleCreateSkill(name: string) {
    setIsCreating(true);
    try {
      createSkill.mutate(
        { skill_name: name, type: skillType === "soft" ? "soft" : "technical" },
        {
          onSuccess: (created) => {
            onSkillsChange?.([...selectedSkills, created.skill_name]);
            setIsOpen(false);
            setSearchQuery("");
          },
        }
      );
    } catch (err: unknown) {
      // if duplicate, re-run search or show simple feedback
      const e = err as { response?: { status?: number } };
      if (e?.response?.status === 409) {
        // duplicate — fetch latest suggestions and add the existing one
        // attempt to find the existing skill in current results
        const existing = results.find(
          (r) => r.skill_name.toLowerCase() === name.toLowerCase()
        );
        if (existing) {
          onSkillsChange?.([...selectedSkills, existing.skill_name]);
        }
      }
      // otherwise, noop — could surface toast later
    } finally {
      setIsCreating(false);
    }
  }

  function handleRemoveSkill(skillName: string) {
    onSkillsChange?.(selectedSkills.filter((s) => s !== skillName));
  }

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedSkills.map((name, idx) => (
          <Badge key={idx} variant="secondary" className="gap-1">
            {name}
            <button
              type="button"
              onClick={() => handleRemoveSkill(name)}
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
              placeholder={`Search ${skillType} skills...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setIsOpen(true);
                }
              }}
              className="pl-9"
              disabled={selectedSkills.length >= maxSkills}
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
                <div className="w-6 h-6 animate-spin rounded-full border-2 border-muted-foreground/40 border-t-muted-foreground"></div>
              </div>
            )}

            {results.length > 0 && (
              <div className="py-2">
                      {results.map((skill) => (
                        <button
                          type="button"
                          key={skill.skill_id}
                          onClick={() => handleSelectSkill(skill)}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            selectedSkills.includes(skill.skill_name)
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          {skill.skill_name}
                        </button>
                      ))}
              </div>
            )}

            {!isLoading && results.length === 0 && (
              <div className="px-4 py-4 text-center text-sm text-muted-foreground">
                {!searchQuery.trim() && <div>Type a skill name to search</div>}

                {searchQuery.trim() && (
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <p>No skills found for `{searchQuery.trim()}`.</p>
                    <Button
                      type="button"
                      className="w-fit"
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => handleCreateSkill(searchQuery.trim())}
                      disabled={isCreating || !searchQuery.trim()}
                    >
                      {isCreating
                        ? "Creating..."
                        : <>Add skill <span className="text-skillmatch-muted-dark">`{searchQuery.trim()}`</span></>}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
