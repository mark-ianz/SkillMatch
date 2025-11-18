import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default async function NavigationMenuCompany() {
  const session = await getServerSession(authConfig);
  const isAuth = !!session;

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/company" className="bg-transparent">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        {isAuth && (
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/company/applications"
              className="bg-transparent"
            >
              Applications
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

        {!isAuth && (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/company#benefits"
                className="bg-transparent"
              >
                Benefits
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/company#how-it-works"
                className="bg-transparent"
              >
                How It Works
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="bg-transparent">
                For OJT
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
