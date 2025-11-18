"use client";

import MainLayout from "@/components/layout/MainLayout";
import SidebarProfile from "@/components/page_specific/sidebar/SidebarProfile";
import { CompanyPostsFeed } from "@/components/page_specific/feed/CompanyPostsFeed";
import { SuggestedCompanies } from "@/components/page_specific/feed/SuggestedCompanies";
import { SessionProvider } from "next-auth/react";
import QueryClientProviderWrapper from "@/components/providers/QueryClientProviderWrapper";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function FeedPage() {
  return (
    <SessionProvider>
      <MainLayout className="items-center pb-20" wrapperClassName="py-4">
        <div className="flex gap-6 w-full mt-4 max-w-[1400px] mx-auto">
          {/* Left Sidebar - Profile */}
          <div>
            <Link href="/company/create-post" className="border-2 p-4 rounded-md border-dashed flex flex-col items-center justify-center mb-6 cursor-pointer hover:bg-muted/50 transition-colors border-skillmatch-primary-blue text-skillmatch-primary-blue">
              <p>Create new post</p>
              <PlusCircleIcon />
            </Link>
            <div className="w-80 flex-shrink-0 sticky top-24 h-fit">
              <SidebarProfile />
            </div>
          </div>

          {/* Middle Section - Company Posts Feed */}
          <div className="flex-1 min-w-0">
            <QueryClientProviderWrapper>
              <CompanyPostsFeed />
            </QueryClientProviderWrapper>
          </div>

          {/* Right Sidebar - Suggested Companies */}
          <div className="w-80 flex-shrink-0">
            <QueryClientProviderWrapper>
              <SuggestedCompanies />
            </QueryClientProviderWrapper>
          </div>
        </div>
      </MainLayout>
    </SessionProvider>
  );
}
