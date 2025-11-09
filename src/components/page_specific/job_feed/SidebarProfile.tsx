"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Heart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ambatublow from "@/images/ambatublow.jpg"

export function SidebarProfile() {
  const { name, idNumber, course, location, avatarSrc } = {
    name: "Ooh Ambatublow",
    idNumber: "23-6967",
    course: "Bachelor of Science in Information Technology",
    location: "Novaliches, Quezon City",
    avatarSrc: ambatublow,
  };

  return (
    <Card className="pt-0 border-0">
      {/* <div className="text-center space-y-3">
        <Avatar className="w-16 h-16 mx-auto">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" />
          <AvatarFallback>KC</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-foreground">Ken Kaneki</h3>
          <p className="text-xs text-muted-foreground">BS Computer Science</p>
          <p className="text-xs text-muted-foreground">Quezon City, Manila</p>
        </div>
      </div> */}
      <div
        className={cn("h-12 w-full bg-skillmatch-primary-green rounded-t-lg")}
      />

      {/* <ProfileBanner data={dummy_profile} /> */}
      <div className="relative -mt-12 flex justify-center">
        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100">
            {avatarSrc ? (
              <Image src={avatarSrc} alt={name} fill className="object-cover" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-slate-700"
              >
                <circle cx="12" cy="8" r="3" fill="currentColor" />
                <path
                  d="M4 20c0-3.3137 2.6863-6 6-6h4c3.3137 0 6 2.6863 6 6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 space-y-4">
        <div className="flex flex-col gap-1 pt-2">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <div className="text-lg font-semibold text-slate-800">{name}</div>
            </div>

            {idNumber ? (
              <p className="text-xs text-slate-600">{idNumber}</p>
            ) : null}
          </div>
          <div>
            {course ? (
              <div className="text-xs text-slate-700">
                {course.replace("Bachelor of Science in ", "BS ")}
              </div>
            ) : null}

            {location ? (
              <div className="text-xs text-slate-500">{location}</div>
            ) : null}
          </div>
        </div>
        <hr/>
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Heart className="w-4 h-4" />
            <span>Saved OJTs</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Application Tracker</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
