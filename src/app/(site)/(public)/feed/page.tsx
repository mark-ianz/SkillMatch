import MainLayout from "@/components/layout/MainLayout";
import SidebarProfile from "@/components/page_specific/sidebar/SidebarProfile";
import { CompanyPostsFeed } from "@/components/page_specific/feed/CompanyPostsFeed";
import { SuggestedCompanies } from "@/components/page_specific/feed/SuggestedCompanies";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { getRoleName } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function FeedPage() {
  const session = await getServerSession(authConfig);
  const isAuthenticated = !!session;
  const role = session?.user?.role_id;
  const role_name = session?.user ? getRoleName(role) : null;

  return (
    <MainLayout className="items-center pb-20" wrapperClassName="p-4 w-full">
      <div className="flex gap-6 container max-w-7xl mt-4">
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

          <div className="sticky top-24 min-w-80 flex-shrink-0">
            <ScrollArea className="h-[calc(100vh-7rem)]">
              <div className="flex flex-col gap-10 pr-4">
                <SidebarProfile />
                <Separator/>
                <SuggestedCompanies />
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Middle Section - Company Posts Feed */}
        <div className="flex-2">
          <CompanyPostsFeed />
        </div>
      </div>
    </MainLayout>
  );
}