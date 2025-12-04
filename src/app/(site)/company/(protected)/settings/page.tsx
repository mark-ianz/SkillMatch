"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  AnimatedTabsRoot,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from "@/components/ui/animated-tabs";
import { useCompanySettings } from "@/hooks/query/useCompanySettings";
import CompanyProfileTab from "@/components/page_specific/company-settings/CompanyProfileTab";
import CompanyContactTab from "@/components/page_specific/company-settings/CompanyContactTab";
import CompanyLocationTab from "@/components/page_specific/company-settings/CompanyLocationTab";
import CompanySecurityTab from "@/components/page_specific/company-settings/CompanySecurityTab";
import CompanySettingsSkeleton from "@/components/page_specific/company-settings/CompanySettingsSkeleton";
import useCompanySettingsStore from "@/store/CompanySettingsStore";

export default function CompanySettingsPage() {
  const { data: settings, isLoading } = useCompanySettings();

  const setCompanyProfile = useCompanySettingsStore(
    (state) => state.setCompanyProfile
  );
  const setContactInfo = useCompanySettingsStore(
    (state) => state.setContactInfo
  );
  const setLocation = useCompanySettingsStore((state) => state.setLocation);
  const setCompanyLogoPreview = useCompanySettingsStore(
    (state) => state.setCompanyLogoPreview
  );

  // Initialize form states when settings are loaded
  useEffect(() => {
    if (settings) {
      setCompanyProfile({
        company_name: settings.company_name || "",
        description: settings.description || "",
        industry: settings.industry || [],
        date_founded: settings.date_founded || "",
      });

      setContactInfo({
        company_email: settings.company_email || "",
        phone_number: settings.phone_number || "",
        telephone_number: settings.telephone_number || "",
        website: settings.website || "",
        facebook_page: settings.facebook_page || "",
        instagram_page: settings.instagram_page || "",
        twitter_page: settings.twitter_page || "",
      });

      setLocation({
        city_municipality: settings.city_municipality || "",
        barangay: settings.barangay || "",
      });

      setCompanyLogoPreview(settings.company_image);
    }
  }, [
    settings,
    setCompanyProfile,
    setContactInfo,
    setLocation,
    setCompanyLogoPreview,
  ]);

  if (isLoading) {
    return <CompanySettingsSkeleton />;
  }

  return (
    <div className="container py-8 max-w-7xl">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold mb-6"
      >
        Company Settings
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <AnimatedTabsRoot defaultValue="profile" className="space-y-4">
          <AnimatedTabsList className="grid w-full grid-cols-4">
            <AnimatedTabsTrigger value="profile">Profile</AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="contact">Contact</AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="location">Location</AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="security">Security</AnimatedTabsTrigger>
          </AnimatedTabsList>

          <CompanyProfileTab />
          <CompanyContactTab />
          <CompanyLocationTab />
          <CompanySecurityTab />
        </AnimatedTabsRoot>
      </motion.div>
    </div>
  );
}
