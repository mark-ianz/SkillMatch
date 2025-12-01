import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";

export default async function NavigationMenuCompany() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/feed" className="bg-transparent">
            Feed
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent px-2! cursor-pointer">
            Manage
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink className="w-[230px]" href="/company/job-postings">
              <div className="font-medium">Job Postings</div>
              <div className="text-muted-foreground">
                Create and manage your job postings.
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink className="w-[230px]" href="/company/feed-posts">
              <div className="font-medium">Feed Posts</div>
              <div className="text-muted-foreground">
                Create and update your feed posts.
              </div>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
