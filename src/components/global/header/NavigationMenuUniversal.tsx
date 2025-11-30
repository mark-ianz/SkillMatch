import React from "react";
import { getServerSession } from "next-auth";
import NavigationMenuUnauthenticated from "./NavigationMenuUnauthenticated";
import { authConfig } from "@/lib/auth";
import NavigationMenuOJT from "./NavigationMenuOJT";
import NavigationMenuCompany from "./NavigationMenuCompany";

export default async function NavigationMenuUniversal() {
  const session = await getServerSession(authConfig);
  const isAuth = session?.user;
  const userRole = session?.user?.role_id;
  const isOJT = userRole === 3;
  const isCompany = userRole === 4;

  // For authenticated users, show their respective navigation
  if (isAuth && isOJT) {
    return <NavigationMenuOJT />;
  }

  if (isAuth && isCompany) {
    return <NavigationMenuCompany />;
  }

  if (!isAuth) {
    return <NavigationMenuUnauthenticated />;
  }
}
