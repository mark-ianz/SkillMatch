import { Button } from "@/components/ui/button";
import { User, FileText, Bookmark } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderOJTPopoverNavigation() {
  return (
    <>
      <Link href="/ojt/settings">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <User className="mr-2 h-4 w-4" />
          Profile Settings
        </Button>
      </Link>
      <Link href="/ojt/application-tracker">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          My Applications
        </Button>
      </Link>
      <Link href="/ojt/saved">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Bookmark className="mr-2 h-4 w-4" />
          Saved Items
        </Button>
      </Link>
    </>
  );
}
