"use client";

import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from "@/hooks/query/useNotifications";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck, ClipboardList, Calendar, PartyPopper } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Notification } from "@/types/notification.types";

export default function NotificationsPage() {
  const router = useRouter();
  const { data: notifications, isLoading } = useNotifications(100);
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  const unreadCount = notifications?.filter((n) => !n.is_read).length || 0;

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.is_read) {
      await markAsReadMutation.mutateAsync(notification.notification_id);
    }

    // Navigate to relevant page
    if (notification.application_id) {
      router.push(`/applicant/application-tracker/${notification.application_id}`);
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

  const getNotificationIcon = (type: string) => {
    const iconClass = "h-6 w-6 text-skillmatch-primary-green";
    switch (type) {
      case "application_status_update":
        return <ClipboardList className={iconClass} />;
      case "interview_scheduled":
        return <Calendar className={iconClass} />;
      case "offer_sent":
        return <PartyPopper className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  if (isLoading) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </motion.div>

        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Skeleton className="h-6 w-6 mt-1 rounded-md" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-5 w-12" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={markAllAsReadMutation.isPending}
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">
          {unreadCount > 0
            ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
            : "You're all caught up!"}
        </p>
      </motion.div>

      {!notifications || notifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Bell className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              When you receive updates about your applications, interviews, or offers, they&apos;ll appear here.
            </p>
          </CardContent>
        </Card>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.notification_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                !notification.is_read
                  ? "border-l-4 border-l-skillmatch-primary-green bg-green-50/30"
                  : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-base">
                          {notification.title}
                        </CardTitle>
                        {!notification.is_read && (
                          <Badge
                            variant="default"
                            className="bg-skillmatch-primary-green text-xs"
                          >
                            New
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {notification.message}
                      </CardDescription>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTime(notification.created_at)}
                  </span>
                </div>
              </CardHeader>
            </Card>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
