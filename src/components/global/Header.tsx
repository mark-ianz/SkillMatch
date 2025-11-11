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

export default function Header() {
  return (
    <header className="border-b h-20 flex items-center justify-center sticky top-0 bg-white z-50">
      <PaddedWrapper className=" justify-between">
        <DynamicLogo />
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
          <JoinNowButton />
        </div>
      </PaddedWrapper>
    </header>
  );
}
