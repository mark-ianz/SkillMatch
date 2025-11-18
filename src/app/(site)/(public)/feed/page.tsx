"use client";

import MainLayout from "@/components/layout/MainLayout";
import SidebarProfile from "@/components/page_specific/sidebar/SidebarProfile";
import { CompanyPostsFeed } from "@/components/page_specific/feed/CompanyPostsFeed";
import { SuggestedCompanies } from "@/components/page_specific/feed/SuggestedCompanies";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getRoleName } from "@/lib/utils";

export default function FeedPage() {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const role = session.data?.user?.role_id;
  const role_name = session.data?.user ? getRoleName(role) : null;

  return (
    <MainLayout
      className="items-center pb-20"
      wrapperClassName="py-4 w-full container"
    >
      <div className="flex gap-6 w-full mt-4">
        {/* Left Sidebar - Profile */}
        <div className="flex-1">
          {isAuthenticated && role_name === "Company" && (
            <Link
              href="/company/create-post"
              className="border-2 p-4 rounded-md border-dashed flex flex-col items-center justify-center mb-6 cursor-pointer hover:bg-muted/50 transition-colors border-skillmatch-primary-blue text-skillmatch-primary-blue"
            >
              <p>Create new post</p>
              <PlusCircleIcon />
            </Link>
          )}

          <div className="min-w-80 flex-shrink-0 sticky top-24 h-fit">
            <SidebarProfile />
          </div>
        </div>

        {/* Middle Section - Company Posts Feed */}
        <div className="flex-2 min-w-0">
          <CompanyPostsFeed />
        </div>

        {/* Right Sidebar - Suggested Companies */}
        <div className="flex-1">
          <SuggestedCompanies />
        </div>
      </div>
    </MainLayout>
  );
}
