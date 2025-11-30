import React from "react";
import { cn } from "@/lib/utils";
import { Bookmark, Clipboard, Settings } from "lucide-react";

export type Shortcut = {
  id?: string | number;
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

export default function ShortcutsCard({
  items = [],
  className = "",
}: {
  items?: Shortcut[];
  className?: string;
}) {
  const defaults: Shortcut[] = [
    {
      id: 1,
      label: "Saved Applicants",
      icon: (
        <Bookmark className="w-5 h-5 text-[var(--color-skillmatch-dark)]" />
      ),
    },
    {
      id: 2,
      label: "Application Tracker",
      icon: (
        <Clipboard className="w-5 h-5 text-[var(--color-skillmatch-dark)]" />
      ),
    },
    {
      id: 3,
      label: "Settings",
      icon: (
        <Settings className="w-5 h-5 text-[var(--color-skillmatch-dark)]" />
      ),
    },
  ];

  const list = items.length ? items : defaults;

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-6 w-full max-w-md",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-[var(--color-skillmatch-dark)]">
        Shortcuts
      </h3>

      <ul className="mt-4 flex flex-col gap-2">
        {list.map((it) => (
          <li key={it.id ?? it.label} className="flex items-center gap-4 hover:bg-skillmatch-dark/5 p-1 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center rounded-md">
              {it.icon}
            </div>
            <div className="text-sm text-[var(--color-skillmatch-dark)]">
              {it.label}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Current Task:
// Cooking job posting for company
// Keep the ChatGPT tab open