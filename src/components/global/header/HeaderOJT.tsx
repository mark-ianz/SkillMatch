
import React from "react";
import DynamicLogo from "../DynamicLogo";
import NavigationMenuOJT from "./NavigationMenuOJT";
import HeaderActions from "./HeaderActions";

export default async function HeaderOJT() {
  const sampleNotifications = [
  {
    id: '1',
    title: 'Application Update',
    message: 'Your application for Web Developer at Tech Corp has been reviewed',
    time: '2 hours ago',
    read: false,
    type: 'application' as const
  },
  {
    id: '2',
    title: 'New Job Match',
    message: 'We found 3 new job opportunities that match your profile',
    time: '5 hours ago',
    read: false,
    type: 'system' as const
  },
  {
    id: '3',
    title: 'Interview Scheduled',
    message: 'Interview scheduled for UI/UX Designer position at Design Studio',
    time: '1 day ago',
    read: true,
    type: 'application' as const
  }
]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <DynamicLogo role="OJT" />
          <div className="flex items-center gap-4">
            <NavigationMenuOJT />
            <HeaderActions notifications={sampleNotifications}/>
          </div>
        </div>
      </div>
    </header>
  );
}
