import { Button } from "@/components/ui/button";
import { Building2, Briefcase, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderCompanyPopoverNavigation() {
  return (
    <>
      <Link href="/company/settings">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Building2 className="mr-2 h-4 w-4" />
          Company Profile Settings
        </Button>
      </Link>
      <Link href="/company/job-postings">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Briefcase className="mr-2 h-4 w-4" />
          My Job Postings
        </Button>
      </Link>
      <Link href="/company/feed-posts">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Feed Posts
        </Button>
      </Link>
    </>
  );
}
