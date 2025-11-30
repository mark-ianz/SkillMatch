import { Button } from "@/components/ui/button";
import { Briefcase, Building2, PlusCircle, LucideIcon, FileText } from "lucide-react";
import Link from "next/link";

interface Shortcut {
  href: string;
  icon: LucideIcon;
  label: string;
  variant?: "default" | "ghost";
}

const shortcuts: Shortcut[] = [
  {
    href: "/company/post-job",
    icon: PlusCircle,
    label: "Post New Job",
    variant: "ghost",
  },
  {
    href: "/company/job-postings",
    icon: Briefcase,
    label: "My Job Postings",
    variant: "ghost",
  },
  {
    href: "/company/feed-posts",
    icon: FileText,
    label: "Feed Posts",
    variant: "ghost",
  },
  {
    href: "/company/settings",
    icon: Building2,
    label: "Company Profile Settings",
    variant: "ghost",
  },
];

export default function CompanyShortcut() {
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
