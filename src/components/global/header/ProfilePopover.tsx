"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LogoutButton from "@/components/common/button/LogoutButton";
import { Roles } from "@/types/role.types";
import HeaderOJTPopoverNavigation from "./HeaderOJTPopoverNavigation";
import HeaderCompanyPopoverNavigation from "./HeaderCompanyPopoverNavigation";
import { useSession } from "next-auth/react";
import { useHeaderProfile } from "@/hooks/query/useProfile";

type Props = {
  userType?: Roles;
};

export default function ProfilePopover({ userType }: Props) {
  const { data: session } = useSession();

  // Determine profile type based on userType
  const profileType =
    userType === "OJT" ? "ojt" : userType === "Company" ? "company" : null;
  const { data: profile, isLoading } = useHeaderProfile(profileType);

  if (!session) return null;

  const isAdmin = session.user.isAdmin || session.user.role_id === 2;

  // Show admin button for admin users
  if (isAdmin) {
    return (
      <Link href="/admin/companies">
        <Button variant="ghost" className="gap-2">
          <span className="text-sm font-medium">Admin Panel</span>
        </Button>
      </Link>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
        <Avatar className="h-9 w-9 border border-skillmatch-primary-green">
          <AvatarFallback className="bg-gradient-to-br from-skillmatch-primary-green to-emerald-500 text-white">
            ...
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  if (!profile) return null;

  const { avatarUrl, name, email } = profile;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9 border border-skillmatch-primary-green">
            <AvatarImage
              className="object-cover"
              src={avatarUrl || undefined}
              alt={name}
            />
            <AvatarFallback className="bg-gradient-to-br from-skillmatch-primary-green to-emerald-500 text-white">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-12 w-12 border border-skillmatch-primary-green">
            <AvatarImage
              className="object-cover"
              src={avatarUrl || undefined}
              alt={name}
            />
            <AvatarFallback className="bg-gradient-to-br from-skillmatch-primary-green to-emerald-500 text-white">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1 truncate">
            <p className="text-sm font-medium leading-none">{name}</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-xs text-muted-foreground truncate hover:underline cursor-pointer">
                  {email}
                </p>
              </TooltipTrigger>
              <TooltipContent side="bottom">{email}</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <Separator />
        <div className="p-2">
          {userType === "OJT" ? (
            <HeaderOJTPopoverNavigation />
          ) : (
            <HeaderCompanyPopoverNavigation />
          )}
        </div>
        <Separator />
        <div className="p-2">
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
