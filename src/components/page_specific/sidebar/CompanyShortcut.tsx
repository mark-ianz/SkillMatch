import { Button } from "@/components/ui/button";
import { Briefcase, Users, Settings, PlusCircle, LucideIcon, FileText } from "lucide-react";
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
    href: "/company/posts",
    icon: FileText,
    label: "My Posts",
    variant: "ghost",
  },
  {
    href: "/company/applications",
    icon: Users,
    label: "Applications",
    variant: "ghost",
  },
  {
    href: "/company/settings",
    icon: Settings,
    label: "Settings",
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
