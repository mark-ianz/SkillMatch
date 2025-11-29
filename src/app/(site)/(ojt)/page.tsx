import OJTCTA from "@/components/page_specific/landing_page/ojt/OJTCTA";
import OJTFeatures from "@/components/page_specific/landing_page/ojt/OJTFeatures";
import OJTHeroSection from "@/components/page_specific/landing_page/ojt/OJTHeroSection";
import OJTHotItWorksSection from "@/components/page_specific/landing_page/ojt/OJTHotItWorksSection";
import OJTStatsSection from "@/components/page_specific/landing_page/ojt/OJTStatsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Perfect OJT",
  description:
    "QCU students: Launch your career with top companies. Search internships and OJT opportunities that match your skills and interests.",
  openGraph: {
    title: "Find Your Perfect OJT - SkillMatch for QCU Students",
    description:
      "Connect with 200+ partner companies. Discover OJT opportunities exclusive to Quezon City University students.",
  },
};

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
