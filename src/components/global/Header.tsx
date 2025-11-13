"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import JoinNowButton from "../common/button/JoinNowButton";
import PaddedWrapper from "./PaddedWrapper";
import DynamicLogo from "./DynamicLogo";
import { getRoleName } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const role_id = useSession().data?.user.role_id;

  if (!role_id) {
    return <StaticHeader />; // or a loading state
  }

  const role = getRoleName(role_id);

  return (
    <header className="border-b h-20 flex items-center justify-center sticky top-0 bg-white z-50">
      <PaddedWrapper className=" justify-between">
        <DynamicLogo role={role} />
        <div className="flex items-center gap-4">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    className="w-[200px]"
                    href="/explore/job-posts"
                  >
                    <div className="font-medium">Jobs</div>
                    <div className="text-muted-foreground">
                      Browse all job listings.
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="w-[200px]"
                    href="/explore/companies"
                  >
                    <div className="font-medium">Companies</div>
                    <div className="text-muted-foreground">
                      Browse all companies.
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/company"
                  className={navigationMenuTriggerStyle()}
                >
                  Become an Employer
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <JoinNowButton role={role} />
        </div>
      </PaddedWrapper>
    </header>
  );
}

function StaticHeader() {
  const pathName = usePathname();

  const isOJT = !pathName?.includes("/company") || pathName.includes("/ojt");
  const isCompany = pathName?.includes("/company");
  const isAdmin = pathName?.includes("/admin");

  const role = isOJT
    ? "OJT"
    : isCompany
    ? "Company"
    : isAdmin
    ? "Admin"
    : "OJT";

  return (
    <header className="border-b h-20 flex items-center justify-center sticky top-0 bg-white z-50">
      <PaddedWrapper className=" justify-between">
        <DynamicLogo role={role} />
        <div className="flex items-center gap-4">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href={isOJT ? "/" : isCompany ? "/company" : "/admin"}
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    className="w-[200px]"
                    href="/explore/job-posts"
                  >
                    <div className="font-medium">Jobs</div>
                    <div className="text-muted-foreground">
                      Browse all job listings.
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="w-[200px]"
                    href="/explore/companies"
                  >
                    <div className="font-medium">Companies</div>
                    <div className="text-muted-foreground">
                      Browse all companies.
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/company"
                  className={navigationMenuTriggerStyle()}
                >
                  Continue as {role === "OJT" ? "Company" : "OJT"}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <JoinNowButton role={role} />
        </div>
      </PaddedWrapper>
    </header>
  );
}
