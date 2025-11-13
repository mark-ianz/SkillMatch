import DynamicLogo from "./DynamicLogo";
import PaddedWrapper from "./PaddedWrapper";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth";
import { getRoleName } from "@/lib/utils";
import JoinNowButton from "../common/button/JoinNowButton";

export default async function Header() {
  const session = await getServerSession(authConfig);
  const role_id = session?.user?.role_id;
  const role = role_id ? getRoleName(role_id) : "OJT"; // default if not logged in

  return (
    <header className="border-b h-20 flex items-center justify-center sticky top-0 bg-white z-50">
      <PaddedWrapper className="justify-between">
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
                  {role === "OJT" ? "Become an Employer" : "Continue as OJT"}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <JoinNowButton role={role}/>
        </div>
      </PaddedWrapper>
    </header>
  );
}
