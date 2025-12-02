import { JobExploreFilter } from "@/components/page_specific/explore/job-postings/JobExploreFilter";
import MainLayout from "@/components/layout/MainLayout";
import Explore from "@/components/page_specific/explore/shared/Explore";
import ExploreFullInfo from "@/components/page_specific/explore/shared/ExploreFullInfo";
import SidebarProfile from "@/components/page_specific/sidebar/SidebarProfile";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function ExplorePage() {
  return (
    <MainLayout className="items-center pb-20" wrapperClassName="p-4 w-full">
      <div className="flex gap-6 mt-4 container max-w-7xl">
        {/* Left Sidebar */}
        <div className="flex-2 sticky top-24 h-fit">
          <ScrollArea className="h-[calc(100vh-7rem)]">
            <div className="space-y-6 pr-4">
              <SidebarProfile />
              <JobExploreFilter />
            </div>
          </ScrollArea>
        </div>

        <Explore />
        <ExploreFullInfo />
      </div>
    </MainLayout>
  );
}
