"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavigationMenuUnauthenticated() {
  const pathname = usePathname();
  const isCompanyRoute = pathname?.startsWith("/company");

  // For unauthenticated users, show navigation based on current route
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href={isCompanyRoute ? "/company" : "/"}
            className="bg-transparent"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        {!isCompanyRoute && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent px-2! cursor-pointer">
              Explore
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink
                className="w-[200px]"
                href="/explore/job-posts"
              >
                <div className="font-medium">Jobs</div>
                <div className="text-muted-foreground">
                  See available positions
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink
                className="w-[200px]"
                href="/explore/companies"
              >
                <div className="font-medium">Companies</div>
                <div className="text-muted-foreground">
                  See company profiles
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className="bg-transparent">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        {isCompanyRoute && (
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/company#benefits"
              className="bg-transparent"
            >
              Benefits
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <NavigationMenuLink
            href={`${isCompanyRoute ? "/company#how-it-works" : "/#how-it-works"}`}
            className="bg-transparent"
          >
            How It Works
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className="bg-transparent">
            For Applicants
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  // Default: OJT/Public navigation
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className="bg-transparent">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className="bg-transparent">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/#how-it-works" className="bg-transparent">
            How It Works
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/company" className="bg-transparent">
            For Companies
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
