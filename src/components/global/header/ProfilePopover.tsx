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
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { UserService } from "@/services/user.services";
import CompanyServices from "@/services/company.services";
import { Roles } from "@/types/role.types";
import HeaderOJTPopoverNavigation from "./HeaderOJTPopoverNavigation";
import HeaderCompanyPopoverNavigation from "./HeaderCompanyPopoverNavigation";

type Props = {
  userType?: Roles;
};

export default async function ProfilePopover({ userType }: Props) {
  const session = await getServerSession(authConfig);

  if (!session) return null;

  const isAdmin = (session.user as any).isAdmin || session.user.role_id === 2;
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

  const user_id = session.user.user_id;
  const company_id = session.user.company_id;

  console.log({ company_id, me: "t" });
  // Fetch dynamic profile data
  let avatarUrl: string | null = null;
  let name: string = "";
  let email: string = "";

  if (userType === "OJT" && user_id) {
    const profile = await UserService.getOJTProfileForHeader(user_id);
    if (profile) {
      avatarUrl = profile.ojt_image_path;
      name = `${profile.first_name} ${profile.last_name}`;
      email = profile.email;
    }
  } else if (userType === "Company" && company_id) {
    const profile = await CompanyServices.getCompanyProfileForHeader(
      company_id
    );
    if (profile) {
      avatarUrl = profile.company_image;
      name = profile.company_name;
      email = profile.email;
    }
  }

  if (!name || !email) return null;

  console.log(avatarUrl);

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
