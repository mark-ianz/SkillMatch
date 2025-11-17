import { Button } from "../../ui/button";

import React from "react";
import DynamicLogo from "../DynamicLogo";
import NavigationMenuOJT from "./NavigationMenuOJT";
import { Link } from "lucide-react";

export default async function HeaderOJT() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <DynamicLogo role="OJT" />
          <div className="flex items-center gap-4">
            <NavigationMenuOJT />
            <Button asChild variant="outline" size="sm">
              <Link href="/signin?type=ojt">Sign In</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-skillmatch-primary-green text-skillmatch-light hover:bg-skillmatch-primary-green/90"
            >
              <Link href="/signup?type=ojt">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
