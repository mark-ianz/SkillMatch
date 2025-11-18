"use client";

import MainLayout from "@/components/layout/MainLayout";
import SidebarProfile from "@/components/page_specific/sidebar/SidebarProfile";
import { CompanyPostsFeed } from "@/components/page_specific/feed/CompanyPostsFeed";
import { SuggestedCompanies } from "@/components/page_specific/feed/SuggestedCompanies";
import { SessionProvider } from "next-auth/react";
import QueryClientProviderWrapper from "@/components/providers/QueryClientProviderWrapper";

export default function FeedPage() {
  return (
    <SessionProvider>
      <MainLayout className="items-center pb-20" wrapperClassName="py-4">
        <div className="flex gap-6 w-full mt-4 max-w-[1400px] mx-auto">
          {/* Left Sidebar - Profile */}
          <div className="w-80 flex-shrink-0 sticky top-4 h-fit">
            <SidebarProfile />
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
