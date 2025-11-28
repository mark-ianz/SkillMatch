import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { getRoleName } from "@/lib/utils";
import { Notification } from "@/types/notification.types";
import NotificationPopover from "./NotificationPopover";
import ProfilePopover from "./ProfilePopover";
import { NotificationServices } from "@/services/notification.services";

export default async function HeaderActions() {
  const session = await getServerSession(authConfig);
  const role = getRoleName(session?.user.role_id);

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

  const isAdmin = (session.user as any).isAdmin || session.user.role_id === 2;

  // Fetch notifications for user/company
  let notifications: Notification[] = [];
  try {
    if (session.user.role_id === 4 && session.user.company_id) {
      // Company
      notifications = await NotificationServices.getCompanyNotifications(
        session.user.company_id as string,
        20
      );
    } else if (session.user.role_id === 3 && session.user.user_id) {
      // OJT/Student
      notifications = await NotificationServices.getUserNotifications(
        session.user.user_id,
        20
      );
    }
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
  }

  if (role === "OJT" || role === "Company" || isAdmin) {
    return (
      <div className="flex items-center gap-2">
        {!isAdmin && (
          <NotificationPopover notifications={notifications} />
        )}
        <ProfilePopover userType={role} />
      </div>
    );
  }
}
