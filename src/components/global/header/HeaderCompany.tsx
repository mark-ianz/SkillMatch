import React from "react";
import DynamicLogo from "../DynamicLogo";
import NavigationMenuCompany from "./NavigationMenuCompany";
import HeaderActions from "./HeaderActions";

export default async function HeaderCompany() {
  const companyNotifications = [
    {
      id: "1",
      title: "New Application",
      message: "Maria Santos applied for Frontend Developer position",
      time: "1 hour ago",
      read: false,
      type: "application" as const,
    },
    {
      id: "2",
      title: "Application Deadline",
      message: 'Your job posting "Backend Developer" expires in 3 days',
      time: "3 hours ago",
      read: false,
      type: "system" as const,
    },
    {
      id: "3",
      title: "Profile View",
      message: "12 students viewed your company profile today",
      time: "1 day ago",
      read: true,
      type: "system" as const,
    },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <DynamicLogo role="Company" />
          <div className="flex items-center gap-4">
            <NavigationMenuCompany />
            <HeaderActions notifications={companyNotifications}/>
          </div>
        </div>
      </div>
    </header>
  );
}
