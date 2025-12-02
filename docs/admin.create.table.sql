-- Admin table for credential-based authentication
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `unique_username` (`username`),
  INDEX `idx_username` (`username`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert default admin account (password: admin123)
-- Password hash generated with bcrypt (10 rounds)
INSERT INTO `admin` (`username`, `password_hash`, `full_name`, `email`, `is_active`)
VALUES ('admin', '$2a$10$YKQz8MJqLJEE9YYqGp6V4.rKz9pJNGzYQx7J5FGxVPQZ0X1EJMZUa', 'System Administrator', 'admin@skillmatch.com', 1);

-- Note: Default credentials for testing
-- Username: admin
-- Password: admin123
-- PLEASE CHANGE IMMEDIATELY IN PRODUCTION!
