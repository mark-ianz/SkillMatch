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
import useSignupStore from "@/store/SignupStore";

export default function SearchSkill() {
  const addSkill = useSignupStore((state) => state.addSkill);

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Skill[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const dummySkills = [
    {
      skill_id: 1,
      skill_name: "HTML",
    },
    {
      skill_id: 2,
      skill_name: "CSS",
    },
    {
      skill_id: 3,
      skill_name: "JavaScript",
    },
    {
      skill_id: 4,
      skill_name: "React",
    },
    {
      skill_id: 5,
      skill_name: "NodeJS",
    },
    {
      skill_id: 6,
      skill_name: "TypeScript",
    },
    {
      skill_id: 7,
      skill_name: "Python",
    },
    {
      skill_id: 8,
      skill_name: "Ruby",
    },
    {
      skill_id: 9,
      skill_name: "PHP",
    },
    {
      skill_id: 10,
      skill_name: "Go",
    },
    {
      skill_id: 11,
      skill_name: "Swift",
    },
    {
      skill_id: 12,
      skill_name: "Kotlin",
    },
    {
      skill_id: 13,
      skill_name: "Dart",
    },
    {
      skill_id: 14,
      skill_name: "Scala",
    },
    {
      skill_id: 15,
      skill_name: "Elixir",
    },
  ];

  const limited = dummySkills.slice(0, 7);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = limited.filter((skill) =>
        skill.skill_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

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
            {results.length > 0 ? (
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
            ) : (
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
