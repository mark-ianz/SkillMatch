# Dynamic Notification System

## Overview

The SkillMatch platform now has a fully dynamic notification system that provides real-time updates to both students/applicants and companies based on key application events.

## Database Structure

### Notifications Table

Created in `notifications.create.table.sql`:

```sql
CREATE TABLE notifications (
  notification_id CHAR(21) PRIMARY KEY,
  user_id INT NULL,                    -- For student/OJT notifications
  company_id CHAR(21) NULL,            -- For company notifications
  type ENUM(...) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  read_at DATETIME NULL,
  application_id CHAR(21) NULL,        -- Reference to application
  job_post_id CHAR(21) NULL,           -- Reference to job post
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

**Important**: Run this SQL script to create the notifications table:
```bash
mysql -u username -p database < notifications.create.table.sql
```

## Notification Types

### For Students/Applicants (User)

1. **`application_status_update`** - Application tracker status was updated
   - Triggered when company changes application status (shortlisted, on hold, etc.)
   - Example: "You've Been Shortlisted!"

2. **`interview_scheduled`** - Interview has been scheduled
   - Triggered when company schedules an interview
   - Includes date, time, and interview details
   - Example: "Your interview for Web Developer at Tech Corp is scheduled for December 1, 2025 at 2:00 PM"

3. **`offer_sent`** - Company sent selection offer
   - Triggered when company selects the applicant
   - Includes offer deadline for response
   - Example: "Tech Corp has selected you for Web Developer. Please respond by December 15, 2025"

### For Companies

1. **`application_received`** - Someone applied to their job post
   - Triggered when a student submits an application
   - Links to the job post's applicant list
   - Example: "A student applied for Frontend Developer"

2. **`offer_response`** - Student responded to the company selection offer
   - Triggered when student accepts or declines offer
   - Shows whether offer was accepted or declined
   - Example: "Maria Santos has accepted your offer for Web Developer"

## Implementation Details

### Files Created/Modified

**Database:**
- `notifications.create.table.sql` - Table schema

**Types:**
- `src/types/notification.types.ts` - TypeScript definitions for notification types

**Services:**
- `src/services/notification.services.ts` - Business logic for creating, fetching, marking as read
- `src/services/application.services.ts` - Modified to trigger notifications on application events

**API:**
- `src/app/api/notifications/route.ts` - REST endpoints for notifications
  - `GET /api/notifications?limit=50` - Fetch notifications
  - `PATCH /api/notifications` - Mark as read (single or all)

**Hooks:**
- `src/hooks/query/useNotifications.ts` - React Query hooks for notifications

**Components:**
- `src/components/global/header/NotificationPopover.tsx` - Updated to fetch real data
- `src/components/global/header/HeaderActions.tsx` - Fetches notifications server-side
- `src/components/global/header/HeaderOJT.tsx` - Removed sample data
- `src/components/global/header/HeaderCompany.tsx` - Removed sample data

### Notification Triggers

#### When User Applies to Job
```typescript
// In ApplicationServices.applyToJob()
await NotificationServices.createCompanyNotification(
  company_id,
  "application_received",
  "New Application Received",
  `A student applied for ${job_title}`,
  application_id,
  job_post_id
);
```

#### When Company Updates Application Status
```typescript
// In ApplicationServices.updateCompanyStatus()
await NotificationServices.createUserNotification(
  user_id,
  "application_status_update",
  "You've Been Shortlisted!",
  `Great news! You've been shortlisted for ${job_title}`,
  application_id,
  job_post_id
);
```

#### When Interview is Scheduled
```typescript
// In ApplicationServices.scheduleInterview()
await NotificationServices.createUserNotification(
  user_id,
  "interview_scheduled",
  "Interview Scheduled",
  `Your interview for ${job_title} at ${company_name} is scheduled for ${date}`,
  application_id,
  job_post_id
);
```

#### When Offer is Sent
```typescript
// In ApplicationServices.selectApplicant()
await NotificationServices.createUserNotification(
  user_id,
  "offer_sent",
  "Congratulations! You've Been Selected",
  `${company_name} has selected you for ${job_title}. Please respond by ${deadline}`,
  application_id,
  job_post_id
);
```

#### When Student Responds to Offer
```typescript
// In ApplicationServices.respondToOffer()
await NotificationServices.createCompanyNotification(
  company_id,
  "offer_response",
  accepted ? "Offer Accepted!" : "Offer Declined",
  `${studentName} has ${accepted ? 'accepted' : 'declined'} your offer for ${job_title}`,
  application_id,
  job_post_id
);
```

## Features

### Real-Time Updates
- Notifications are fetched every 30 seconds using React Query
- Unread count badge shows on bell icon
- Green dot indicator for unread notifications

### Click-to-Navigate
- Clicking a notification marks it as read (if unread)
- Automatically navigates to relevant page:
  - Users → Application tracker detail
  - Companies → Job post applicants page

### Mark All as Read
- Button to mark all notifications as read at once
- Updates immediately in UI

### Server-Side Fetching
- Notifications are fetched server-side in HeaderActions
- Reduces initial client-side loading
- Better performance and SEO

### Automatic Cleanup
- `deleteOldReadNotifications(daysOld)` function available
- Can be scheduled via cron job to clean old read notifications
- Keeps database size manageable

## Usage

### For Developers

#### Create a Custom Notification
```typescript
import { NotificationServices } from '@/services/notification.services';

// For a user
await NotificationServices.createUserNotification(
  user_id,
  'system',
  'Custom Title',
  'Custom message here',
  optional_application_id,
  optional_job_post_id
);

// For a company
await NotificationServices.createCompanyNotification(
  company_id,
  'system',
  'Custom Title',
  'Custom message here',
  optional_application_id,
  optional_job_post_id
);
```

#### Fetch Notifications in a Component
```typescript
'use client';
import { useNotifications } from '@/hooks/query/useNotifications';

export default function MyComponent() {
  const { data: notifications, isLoading } = useNotifications(20);
  
  return (
    <div>
      {notifications?.map(notif => (
        <div key={notif.notification_id}>{notif.title}</div>
      ))}
    </div>
  );
}
```

## Testing

### Test User Notifications
1. As a company, create a job post
2. As a student, apply to that job post
   - ✓ Company should receive "New Application Received" notification
3. As a company, schedule an interview
   - ✓ Student should receive "Interview Scheduled" notification
4. As a company, select the applicant
   - ✓ Student should receive "Congratulations! You've Been Selected" notification
5. As a student, accept or decline the offer
   - ✓ Company should receive "Offer Accepted/Declined" notification

### Test Company Notifications
1. As a company, update application status to "Shortlisted"
   - ✓ Student should receive "You've Been Shortlisted!" notification
2. As a company, put application "On Hold"
   - ✓ Student should receive "Application On Hold" notification

## Admin Exclusion

Admins (role_id 2) do not receive or display notifications in the header. The notification popover is only shown for:
- Students/Applicants (role_id 3)
- Companies (role_id 4)

## Future Enhancements

Potential improvements for the notification system:

1. **WebSocket Integration** - Real-time push notifications
2. **Email Notifications** - Send email for critical updates
3. **Notification Preferences** - Allow users to configure which notifications they want
4. **Notification Categories** - Group notifications by type
5. **Rich Notifications** - Add images, actions buttons in notifications
6. **Browser Push Notifications** - Native browser notifications
7. **Notification History Page** - Dedicated page to view all notifications
8. **Notification Settings** - Mute/unmute specific notification types

## Troubleshooting

### Notifications Not Appearing
1. Ensure `notifications` table is created in database
2. Check server logs for notification creation errors
3. Verify role_id is correct (3 for users, 4 for companies)
4. Check browser console for React Query errors

### Notifications Not Marking as Read
1. Verify API endpoint `/api/notifications` is accessible
2. Check network tab for PATCH request failures
3. Ensure notification_id is being passed correctly

### Performance Issues
1. Reduce fetch interval in `useNotifications` hook (currently 30s)
2. Lower the limit of notifications fetched (default 50)
3. Run cleanup function to remove old notifications
4. Add database indexes if queries are slow

## Security

- Notifications are filtered by user_id or company_id automatically
- Users can only see their own notifications
- Companies can only see their company's notifications
- Authorization is enforced at the API and service layer
- Admins have no access to user/company notifications (separate system if needed)
