import { JobExploreFilter } from "@/components/page_specific/explore/job-posts/JobExploreFilter";
import MainLayout from "@/components/layout/MainLayout";
import Explore from "@/components/page_specific/explore/shared/Explore";
import ExploreFullInfo from "@/components/page_specific/explore/shared/ExploreFullInfo";
import SidebarProfile from "@/components/page_specific/sidebar/SidebarProfile";

export default async function ExplorePage() {
  return (
    <MainLayout className="items-center pb-20" wrapperClassName="py-4">
      <div className="flex gap-6 mt-4 container">
        {/* Left Sidebar */}
        <div className="flex-2 sticky space-y-6 h-fit">
          <SidebarProfile />
          <JobExploreFilter className="sticky top-28" />
        </div>

        <Explore />
        <ExploreFullInfo />
      </div>
    </MainLayout>
  );
}
