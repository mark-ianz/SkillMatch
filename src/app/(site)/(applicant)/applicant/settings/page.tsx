"use client";

import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserSettings } from "@/hooks/query/useUserSettings";
import PersonalInfoTab from "@/components/page_specific/settings/PersonalInfoTab";
import AccountTab from "@/components/page_specific/settings/AccountTab";
import AvailabilityTab from "@/components/page_specific/settings/AvailabilityTab";
import EducationTab from "@/components/page_specific/settings/EducationTab";
import SettingsSkeleton from "@/components/page_specific/settings/SettingsSkeleton";
import useSettingsStore from "@/store/SettingsStore";

export default function ApplicantSettingsPage() {
  const { data: settings, isLoading } = useUserSettings();
  
  const setPersonalInfo = useSettingsStore((state) => state.setPersonalInfo);
  const setAvailability = useSettingsStore((state) => state.setAvailability);
  const setSkills = useSettingsStore((state) => state.setSkills);
  const setEducation = useSettingsStore((state) => state.setEducation);
  const setProfilePicturePreview = useSettingsStore((state) => state.setProfilePicturePreview);

  // Initialize form states when settings are loaded
  useEffect(() => {
    if (settings) {
      setPersonalInfo({
        first_name: settings.first_name || "",
        middle_name: settings.middle_name || "",
        last_name: settings.last_name || "",
        phone_number: settings.phone_number || "",
        street_name: settings.street_name || "",
        house_number: settings.house_number || "",
        subdivision: settings.subdivision || "",
        postal_code: settings.postal_code || "",
        barangay: settings.barangay || "",
        city_municipality: settings.city_municipality || "",
      });

      setAvailability({
        preferred_schedule: settings.preferred_schedule
          ? settings.preferred_schedule.split(",")
          : [],
        required_hours: settings.required_hours || 0,
      });

      setSkills(settings.skills || []);

      setEducation({
        student_number: settings.student_number || "",
        college: settings.college || "",
        course: settings.course || "",
        year_level:
          (settings.year_level as "3rd year" | "4th year") || "3rd year",
        expected_graduation_year:
          settings.expected_graduation_year ||
          new Date().getFullYear().toString(),
      });

      setProfilePicturePreview(settings.applicant_image_path);
    }
  }, [settings, setPersonalInfo, setAvailability, setSkills, setEducation, setProfilePicturePreview]);

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <PersonalInfoTab />
        <AccountTab />
        <AvailabilityTab />
        <EducationTab />
      </Tabs>
    </>
  );
}
