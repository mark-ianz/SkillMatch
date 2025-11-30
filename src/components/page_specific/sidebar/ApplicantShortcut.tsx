import { Button } from "@/components/ui/button";
import { Search, FileText, Bookmark, User, LucideIcon } from "lucide-react";
import Link from "next/link";

interface Shortcut {
  href: string;
  icon: LucideIcon;
  label: string;
  variant?: "default" | "ghost";
}

const shortcuts: Shortcut[] = [
  {
    href: "/explore/job-postings",
    icon: Search,
    label: "Browse Jobs",
    variant: "ghost",
  },
  {
    href: "/applicant/application-tracker",
    icon: FileText,
    label: "My Applications",
    variant: "ghost",
  },
  {
    href: "/applicant/saved",
    icon: Bookmark,
    label: "Saved Items",
    variant: "ghost",
  },
  {
    href: "/applicant/settings",
    icon: User,
    label: "Profile Settings",
    variant: "ghost",
  },
];

export default function ApplicantShortcut() {
  return (
    <div className="space-y-2">
      {shortcuts.map((shortcut) => {
        const Icon = shortcut.icon;
        return (
          <Button
            key={shortcut.href}
            variant={shortcut.variant}
            className="w-full justify-start gap-2"
            size="sm"
            asChild
          >
            <Link href={shortcut.href}>
              <Icon className="w-4 h-4" />
              <span>{shortcut.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
