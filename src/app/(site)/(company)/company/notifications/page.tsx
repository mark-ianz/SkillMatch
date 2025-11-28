"use client";

import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from "@/hooks/query/useNotifications";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Notification } from "@/types/notification.types";

export default function CompanyNotificationsPage() {
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

    // Navigate to relevant page - company goes to job post applicants
    if (notification.job_post_id) {
      router.push(`/company/job-posts/${notification.job_post_id}`);
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
    switch (type) {
      case "application_received":
        return "📨";
      case "offer_response":
        return "✅";
      case "system":
        return "⚙️";
      default:
        return "🔔";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
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
      </div>

      {!notifications || notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Bell className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              When students apply to your job posts or respond to your offers, you'll receive notifications here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card
              key={notification.notification_id}
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
                    <span className="text-2xl mt-1">
                      {getNotificationIcon(notification.type)}
                    </span>
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
          ))}
        </div>
      )}
    </div>
  );
}
