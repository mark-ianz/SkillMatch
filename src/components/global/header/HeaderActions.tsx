"use client";

import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { getRoleName } from "@/lib/utils";
import NotificationPopover from "./NotificationPopover";
import ProfilePopover from "./ProfilePopover";
import { useSession } from "next-auth/react";

export default function HeaderActions() {
  const { data: session } = useSession();
  const role_id = session?.user?.role_id;
  const role = getRoleName(role_id);

  if (!session) {
    return (
      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/signin">Sign In</Link>
        </Button>
        <Button
          asChild
          size="sm"
          className="bg-skillmatch-primary-green text-skillmatch-light hover:bg-skillmatch-primary-green/90"
        >
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    );
  }

  const isAdmin = session?.user?.isAdmin;

  if (role === "OJT" || role === "Company" || isAdmin) {
    return (
      <div className="flex items-center gap-2">
        {!isAdmin && <NotificationPopover />}
        <ProfilePopover userType={role} />
      </div>
    );
  }
}
