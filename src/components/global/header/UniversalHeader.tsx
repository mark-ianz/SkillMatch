import React from "react";
import DynamicLogo from "../DynamicLogo";
import NavigationMenuUniversal from "./NavigationMenuUniversal";
import HeaderActions from "./HeaderActions";
import { Roles } from "@/types/role.types";

export default async function UniversalHeader({ role }: { role: Roles }) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <DynamicLogo role={role} />
          <div className="flex items-center gap-4">
            <NavigationMenuUniversal />
            <HeaderActions />
          </div>
        </div>
      </div>
    </header>
  );
}
