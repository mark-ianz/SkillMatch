import ApplicantCTA from "@/components/page_specific/landing_page/applicant/ApplicantCTA";
import ApplicantFeatures from "@/components/page_specific/landing_page/applicant/ApplicantFeatures";
import ApplicantHeroSection from "@/components/page_specific/landing_page/applicant/ApplicantHeroSection";
import ApplicantHotItWorksSection from "@/components/page_specific/landing_page/applicant/ApplicantHotItWorksSection";
import ApplicantStatsSection from "@/components/page_specific/landing_page/applicant/ApplicantStatsSection";
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

export default function ApplicantLandingPage() {
  return (
    <div className="min-h-screen bg-background w-full">
      <ApplicantHeroSection />
      <ApplicantStatsSection />
      <ApplicantHotItWorksSection />
      <ApplicantFeatures />
      <ApplicantCTA />
    </div>
  );
}
