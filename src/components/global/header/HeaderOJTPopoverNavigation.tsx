import { Button } from "@/components/ui/button";
import { FileText, Search, UserCog } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderOJTPopoverNavigation() {
  return (
    <>
      <Link href="/ojt/settings">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <UserCog className="mr-2 h-4 w-4" />
          Account Settings
        </Button>
      </Link>
      <Link href="/applications">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          My Applications
        </Button>
      </Link>
      <Link href="/explore/job-posts">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Search className="mr-2 h-4 w-4" />
          Browse Jobs
        </Button>
      </Link>
    </>
  );
}
