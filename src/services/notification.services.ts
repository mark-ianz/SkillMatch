import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { nanoid } from "nanoid";
import { Notification, NotificationType } from "@/types/notification.types";

export const NotificationServices = {
  // Create a notification for a user
  createUserNotification: async (
    user_id: number,
    type: NotificationType,
    title: string,
    message: string,
    application_id?: string,
    job_post_id?: string
  ): Promise<Notification> => {
    try {
      const notification_id = nanoid();

      await db.query<ResultSetHeader>(
        `INSERT INTO notifications (
          notification_id,
          user_id,
          type,
          title,
          message,
          application_id,
          job_post_id,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [notification_id, user_id, type, title, message, application_id || null, job_post_id || null]
      );

      const [rows] = await db.query<(RowDataPacket & Notification)[]>(
        `SELECT * FROM notifications WHERE notification_id = ?`,
        [notification_id]
      );

      return rows[0];
    } catch (error) {
      console.error("Error creating user notification:", error);
      throw error;
    }
  },

  // Create a notification for a company
  createCompanyNotification: async (
    company_id: string,
    type: NotificationType,
    title: string,
    message: string,
    application_id?: string,
    job_post_id?: string
  ): Promise<Notification> => {
    try {
      const notification_id = nanoid();

      await db.query<ResultSetHeader>(
        `INSERT INTO notifications (
          notification_id,
          company_id,
          type,
          title,
          message,
          application_id,
          job_post_id,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [notification_id, company_id, type, title, message, application_id || null, job_post_id || null]
      );

      const [rows] = await db.query<(RowDataPacket & Notification)[]>(
        `SELECT * FROM notifications WHERE notification_id = ?`,
        [notification_id]
      );

      return rows[0];
    } catch (error) {
      console.error("Error creating company notification:", error);
      throw error;
    }
  },

  // Get all notifications for a user
  getUserNotifications: async (user_id: number, limit: number = 50): Promise<Notification[]> => {
    try {
      const [rows] = await db.query<(RowDataPacket & Notification)[]>(
        `SELECT * FROM notifications 
         WHERE user_id = ? 
         ORDER BY created_at DESC 
         LIMIT ?`,
        [user_id, limit]
      );

      return rows;
    } catch (error) {
      console.error("Error fetching user notifications:", error);
      throw error;
    }
  },

  // Get all notifications for a company
  getCompanyNotifications: async (company_id: string, limit: number = 50): Promise<Notification[]> => {
    try {
      const [rows] = await db.query<(RowDataPacket & Notification)[]>(
        `SELECT * FROM notifications 
         WHERE company_id = ? 
         ORDER BY created_at DESC 
         LIMIT ?`,
        [company_id, limit]
      );

      return rows;
    } catch (error) {
      console.error("Error fetching company notifications:", error);
      throw error;
    }
  },

  // Get unread count for user
  getUserUnreadCount: async (user_id: number): Promise<number> => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT COUNT(*) as count FROM notifications 
         WHERE user_id = ? AND is_read = FALSE`,
        [user_id]
      );

      return rows[0].count;
    } catch (error) {
      console.error("Error fetching user unread count:", error);
      throw error;
    }
  },

  // Get unread count for company
  getCompanyUnreadCount: async (company_id: string): Promise<number> => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT COUNT(*) as count FROM notifications 
         WHERE company_id = ? AND is_read = FALSE`,
        [company_id]
      );

      return rows[0].count;
    } catch (error) {
      console.error("Error fetching company unread count:", error);
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (notification_id: string): Promise<void> => {
    try {
      await db.query<ResultSetHeader>(
        `UPDATE notifications 
         SET is_read = TRUE, read_at = NOW() 
         WHERE notification_id = ?`,
        [notification_id]
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  },

  // Mark all notifications as read for user
  markAllUserNotificationsAsRead: async (user_id: number): Promise<void> => {
    try {
      await db.query<ResultSetHeader>(
        `UPDATE notifications 
         SET is_read = TRUE, read_at = NOW() 
         WHERE user_id = ? AND is_read = FALSE`,
        [user_id]
      );
    } catch (error) {
      console.error("Error marking all user notifications as read:", error);
      throw error;
    }
  },

  // Mark all notifications as read for company
  markAllCompanyNotificationsAsRead: async (company_id: string): Promise<void> => {
    try {
      await db.query<ResultSetHeader>(
        `UPDATE notifications 
         SET is_read = TRUE, read_at = NOW() 
         WHERE company_id = ? AND is_read = FALSE`,
        [company_id]
      );
    } catch (error) {
      console.error("Error marking all company notifications as read:", error);
      throw error;
    }
  },

  // Delete old read notifications (cleanup - run periodically)
  deleteOldReadNotifications: async (daysOld: number = 30): Promise<void> => {
    try {
      await db.query<ResultSetHeader>(
        `DELETE FROM notifications 
         WHERE is_read = TRUE 
         AND read_at < DATE_SUB(NOW(), INTERVAL ? DAY)`,
        [daysOld]
      );
    } catch (error) {
      console.error("Error deleting old notifications:", error);
      throw error;
    }
  },
};
