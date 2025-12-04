import React from "react";
import { getServerSession } from "next-auth";
import NavigationMenuUnauthenticated from "./NavigationMenuUnauthenticated";
import { authConfig } from "@/lib/auth";
import NavigationMenuApplicant from "./NavigationMenuApplicant";
import NavigationMenuCompany from "./NavigationMenuCompany";
import { headers } from "next/headers";

export default async function NavigationMenuUniversal() {
  // Force dynamic rendering by accessing headers
  await headers();
  
  const session = await getServerSession(authConfig);
  const isAuth = session?.user;
  const userRole = session?.user?.role_id;
  const statusId = session?.user?.status_id;
  const isApplicant = userRole === 3;
  const isCompany = userRole === 4;
  const isActive = statusId === 1;

  console.log({x:session})

  // Hide navigation if user is in onboarding (not active)
  if (isAuth && !isActive) {
    return null;
  }

  // For authenticated users, show their respective navigation
  if (isAuth && isApplicant && isActive) {
    return <NavigationMenuApplicant />;
  }

  if (isAuth && isCompany && isActive) {
    return <NavigationMenuCompany />;
  }

  if (!isAuth) {
    return <NavigationMenuUnauthenticated />;
  }
}
