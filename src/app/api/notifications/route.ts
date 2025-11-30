import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NotificationServices } from "@/services/notification.services";

// GET - Fetch notifications for current user/company
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");

    let notifications;

    // Check if user is a company (role_id 4) or Applicant/student (role_id 3)
    if (session.user.role_id === 4) {
      // Company
      const companyId = session.user.company_id as string;
      if (!companyId) {
        return NextResponse.json(
          { message: "Company ID not found" },
          { status: 400 }
        );
      }
      notifications = await NotificationServices.getCompanyNotifications(
        companyId,
        limit
      );
    } else if (session.user.role_id === 3) {
      // Applicant/Student
      const userId = session.user.user_id;
      if (!userId) {
        return NextResponse.json(
          { message: "User ID not found" },
          { status: 400 }
        );
      }
      notifications = await NotificationServices.getUserNotifications(
        userId,
        limit
      );
    } else {
      return NextResponse.json(
        { message: "Invalid user role" },
        { status: 403 }
      );
    }

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { message: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

// PATCH - Mark notification(s) as read
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { notification_id, mark_all } = await request.json();

    if (mark_all) {
      // Mark all as read
      if (session.user.role_id === 4) {
        const companyId = session.user.company_id as string;
        await NotificationServices.markAllCompanyNotificationsAsRead(companyId);
      } else if (session.user.role_id === 3) {
        const userId = session.user.user_id;
        if (!userId) {
          return NextResponse.json(
            { message: "User ID not found" },
            { status: 400 }
          );
        }
        await NotificationServices.markAllUserNotificationsAsRead(userId);
      }
    } else {
      // Mark single notification as read
      if (!notification_id) {
        return NextResponse.json(
          { message: "Notification ID is required" },
          { status: 400 }
        );
      }
      await NotificationServices.markAsRead(notification_id);
    }

    return NextResponse.json(
      { message: "Notification(s) marked as read" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return NextResponse.json(
      { message: "Failed to mark notification as read" },
      { status: 500 }
    );
  }
}
