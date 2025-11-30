import React from "react";
import HeroSection from "@/components/page_specific/landing_page/HeroSection";
import GettingStartedSection from "@/components/page_specific/landing_page/GettingStartedSection";
import WhyChooseUsSection from "@/components/page_specific/landing_page/WhyChooseUsSection";
import CTABannerSection from "@/components/page_specific/landing_page/CTABannerSection";

export default function LandingPage() {
  return (
    <main className="pb-20">
      <HeroSection type="applicant" />
      {/* <CategoriesSection /> */}
      <GettingStartedSection type="applicant" />
      <WhyChooseUsSection type="applicant" />
      <CTABannerSection type="applicant" />
    </main>
  );
}
