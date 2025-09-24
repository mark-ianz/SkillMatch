import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="border-b flex items-center justify-between p-6 px-96">
      <p className="font-sans font-semibold text-2xl">SkillMatch</p>
      <div className="flex items-center gap-4">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <Link href="/explore?category=jobs" className="w-[200px]">
                    <div className="font-medium">Jobs</div>
                    <div className="text-muted-foreground">
                      Browse all job listings.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/companies?category=companies">
                    <div className="font-medium">Companies</div>
                    <div className="text-muted-foreground">
                      Browse all companies.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">Become an Employer</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button>Join Now</Button>
      </div>
    </header>
  );
}
