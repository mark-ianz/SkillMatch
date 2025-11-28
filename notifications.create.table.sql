-- Create notifications table
CREATE TABLE notifications (
  notification_id CHAR(21) PRIMARY KEY,
  
  -- Recipient (either user_id OR company_id, not both)
  user_id INT NULL,
  company_id CHAR(21) NULL,
  
  -- Notification Details
  type ENUM(
    'application_status_update',
    'interview_scheduled',
    'offer_sent',
    'offer_response',
    'application_received',
    'system'
  ) NOT NULL,
  
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  -- Status
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  read_at DATETIME NULL,
  
  -- References (optional - for linking to relevant records)
  application_id CHAR(21) NULL,
  job_post_id CHAR(21) NULL,
  
  -- Timestamps
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Foreign Key Constraints
  CONSTRAINT fk_notifications_user
    FOREIGN KEY (user_id)
    REFERENCES user(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  
  CONSTRAINT fk_notifications_company
    FOREIGN KEY (company_id)
    REFERENCES company(company_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  
  CONSTRAINT fk_notifications_application
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  
  CONSTRAINT fk_notifications_job_post
    FOREIGN KEY (job_post_id)
    REFERENCES job_posts(job_post_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  
  -- Indexes for Performance
  INDEX idx_user_notifications (user_id, created_at DESC),
  INDEX idx_company_notifications (company_id, created_at DESC),
  INDEX idx_unread_user (user_id, is_read, created_at DESC),
  INDEX idx_unread_company (company_id, is_read, created_at DESC),
  INDEX idx_type (type),
  INDEX idx_application_ref (application_id),
  INDEX idx_job_post_ref (job_post_id),
  
  -- Ensure only one recipient type
  CONSTRAINT chk_single_recipient CHECK (
    (user_id IS NOT NULL AND company_id IS NULL) OR
    (user_id IS NULL AND company_id IS NOT NULL)
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
