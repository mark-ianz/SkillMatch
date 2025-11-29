import { Button } from "@/components/ui/button";
import { Briefcase, Columns3Cog, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderCompanyPopoverNavigation() {
  return (
    <>
      <Link href="/company/settings">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Columns3Cog className="mr-2 h-4 w-4" />
          Company Settings
        </Button>
      </Link>
      <Link href="/company/post-job">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Briefcase className="mr-2 h-4 w-4" />
          Post a Job
        </Button>
      </Link>
      <Link href="/company/create-post">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Search className="mr-2 h-4 w-4" />
          Create a Post
        </Button>
      </Link>
    </>
  );
}
