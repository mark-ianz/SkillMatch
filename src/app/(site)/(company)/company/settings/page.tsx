"use client";

import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompanySettings } from "@/hooks/query/useCompanySettings";
import CompanyProfileTab from "@/components/page_specific/company-settings/CompanyProfileTab";
import CompanySettingsSkeleton from "@/components/page_specific/company-settings/CompanySettingsSkeleton";
import useCompanySettingsStore from "@/store/CompanySettingsStore";

export default function CompanySettingsPage() {
  const { data: settings, isLoading } = useCompanySettings();

  const setCompanyProfile = useCompanySettingsStore((state) => state.setCompanyProfile);
  const setContactInfo = useCompanySettingsStore((state) => state.setContactInfo);
  const setLocation = useCompanySettingsStore((state) => state.setLocation);
  const setCompanyLogoPreview = useCompanySettingsStore((state) => state.setCompanyLogoPreview);

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
  }, [settings, setCompanyProfile, setContactInfo, setLocation, setCompanyLogoPreview]);

  if (isLoading) {
    return <CompanySettingsSkeleton />;
  }

  return (
    <div className="container py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Company Settings</h1>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <CompanyProfileTab />
        {/* Other tabs will be added later */}
      </Tabs>
    </div>
  );
}
