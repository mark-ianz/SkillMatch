export type NotificationType = 
  | "application_status_update"  // User: Application tracker updated
  | "interview_scheduled"        // User: Interview scheduled
  | "offer_sent"                 // User: Company sent offer
  | "offer_response"             // Company: Student responded to offer
  | "application_received"       // Company: Someone applied to job post
  | "system";                    // System notifications

export type Notification = {
  notification_id: string;
  
  // Recipient (only one will be populated)
  user_id?: number | null;
  company_id?: string | null;
  
  // Notification content
  type: NotificationType;
  title: string;
  message: string;
  
  // Status
  is_read: boolean;
  read_at?: string | null;
  
  // References (optional)
  application_id?: string | null;
  job_post_id?: string | null;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// For display purposes
export type NotificationDisplay = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
  application_id?: string | null;
  job_post_id?: string | null;
}