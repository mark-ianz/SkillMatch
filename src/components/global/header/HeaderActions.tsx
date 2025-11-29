"use client";

import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { getRoleName } from "@/lib/utils";
import NotificationPopover from "./NotificationPopover";
import ProfilePopover from "./ProfilePopover";
import useSessionStore from "@/store/SessionStore";

export default function HeaderActions() {
  const role_id = useSessionStore((state) => state.role_id);
  const isLoading = useSessionStore((state) => state.loading);
  const role = getRoleName(role_id);

  if (isLoading && !role_id) {
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

  const isAdmin = role_id === 2;

  if (role === "OJT" || role === "Company" || isAdmin) {
    return (
      <div className="flex items-center gap-2">
        {!isAdmin && <NotificationPopover />}
        <ProfilePopover userType={role} />
      </div>
    );
  }
}
