import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";

export default function NavigationMenuPublic() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className="bg-transparent">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent px-2! cursor-pointer">
            Explore
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink className="w-[200px]" href="/explore/job-posts">
              <div className="font-medium">Jobs</div>
              <div className="text-muted-foreground">
                Browse all job listings.
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink className="w-[200px]" href="/explore/companies">
              <div className="font-medium">Companies</div>
              <div className="text-muted-foreground">Browse all companies.</div>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className="bg-transparent">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
