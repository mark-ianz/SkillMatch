"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Notification } from "@/types/notification.types";
import { Bell } from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from "@/hooks/query/useNotifications";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NotificationPopover() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: notifications = [] } = useNotifications(20);
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();
  
  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const isCompany = session?.user?.role_id === 4;

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.is_read) {
      await markAsReadMutation.mutateAsync(notification.notification_id);
    }

    // Navigate to relevant page
    if (notification.application_id) {
      if (notification.type === "application_received" || notification.type === "offer_response") {
        // Company view - go to job post applications
        router.push(`/company/job-posts/${notification.job_post_id}`);
      } else {
        // User view - go to application tracker
        router.push(`/ojt/application-tracker/${notification.application_id}`);
      }
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "recently";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full [&_svg:not([class*='size-'])]:size-5.5!">
          <Bell className="" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 pb-3">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                {unreadCount} new
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-xs"
                onClick={handleMarkAllAsRead}
                disabled={markAllAsReadMutation.isPending}
              >
                Mark all as read
              </Button>
            </div>
          )}
        </div>
        <Separator />
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.notification_id}
                className={`flex gap-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                  !notification.is_read ? "bg-green-50/50" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      !notification.is_read ? "bg-green-600" : "bg-transparent"
                    }`}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(notification.created_at)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full justify-center text-sm"
                size="sm"
                onClick={() => router.push(isCompany ? "/company/notifications" : "/ojt/notifications")}
              >
                View all notifications
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
