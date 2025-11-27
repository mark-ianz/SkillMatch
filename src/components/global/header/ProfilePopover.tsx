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
import { Briefcase, FileText, Search, Settings, User } from "lucide-react";
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

type Props = {
  userType: "OJT" | "Company";
};

export default async function ProfilePopover({
  userType,
}: Props) {
  const session = await getServerSession(authConfig);

  if (!session) return null;

  const user_id = session.user.user_id;
  const company_id = session.user.company_id;

  console.log({company_id, me: "t"})
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
    const profile = await CompanyServices.getCompanyProfileForHeader(company_id);
    if (profile) {
      avatarUrl = profile.company_image;
      name = profile.company_name;
      email = profile.email;
    }
  }

  if (!name || !email) return null;

  console.log(avatarUrl)
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
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
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
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
          <Link href="/profile">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Button>
          </Link>
          {userType === "OJT" ? (
            <>
              <Link href="/applications">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  My Applications
                </Button>
              </Link>
              <Link href="/explore/job-posts">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/company/post-job">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Post a Job
                </Button>
              </Link>
              <Link href="/company/create-post">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Create a Post
                </Button>
              </Link>
            </>
          )}
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
        <Separator />
        <div className="p-2">
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
