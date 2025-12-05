import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Briefcase, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AdminSidebarProfile({username, email}: {username?: string, email?: string}) {
  const adminName = username || "Administrator";
  const adminEmail = email || "admin@skillmatch.com";

  return (
    <Card className="pt-0">
      <div className="h-12 w-full bg-skillmatch-primary-green rounded-t-lg" />

      <div className="relative -mt-12 flex justify-center">
        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-skillmatch-primary-green flex items-center justify-center">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
        </div>
      </div>

      <div className="px-6 space-y-4">
        <div className="flex flex-col gap-1 pt-2">
          <div className="text-lg font-semibold text-slate-800 text-center">
            {adminName}
          </div>
          <div className="text-xs text-slate-600 text-center">{adminEmail}</div>
          <div className="text-xs text-skillmatch-primary-green font-medium text-center">
            SPARDS
          </div>
        </div>
        <hr />

        <div className="space-y-2">
          <Link href="/admin/companies" className="block">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Companies
            </Button>
          </Link>
          <Link href="/admin/job-postings" className="block">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Briefcase className="h-4 w-4 mr-2" />
              Job Posts
            </Button>
          </Link>
          <Link href="/admin/students" className="block">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Students
            </Button>
          </Link>
          <Link href="/admin/analytics" className="block">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
