import OJTCTA from "@/components/page_specific/landing_page/ojt/OJTCTA";
import OJTFeatures from "@/components/page_specific/landing_page/ojt/OJTFeatures";
import OJTHeroSection from "@/components/page_specific/landing_page/ojt/OJTHeroSection";
import OJTHotItWorksSection from "@/components/page_specific/landing_page/ojt/OJTHotItWorksSection";
import OJTStatsSection from "@/components/page_specific/landing_page/ojt/OJTStatsSection";

export default function OJTLandingPage() {
  return (
    <div className="min-h-screen bg-background w-full">
      <OJTHeroSection />
      <OJTStatsSection />
      <OJTHotItWorksSection />
      <OJTFeatures />
      <OJTCTA />
    </div>
  );
}
