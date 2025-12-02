CREATE TABLE `ojt_profile` (
  `ojt_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `college` enum('College of Business Administration and Accountancy','College of Education','College of Engineering','College of Computer Studies') NOT NULL,
  `course` enum('BSIT','BSIS','BSCS','BS Entrep','BSA','BECEd','BSIE','BSECE') NOT NULL,
  `year_level` varchar(4) DEFAULT NULL,
  `expected_graduation_year` varchar(4) DEFAULT NULL,
  `skills` text NOT NULL,
  `resume_path` varchar(100) DEFAULT NULL,
  `visibility` enum('public','private') NOT NULL DEFAULT 'private',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ojt_id`),
  KEY `OJT_PROFILE_USER_ID_FK` (`user_id`),
  CONSTRAINT `OJT_PROFILE_USER_ID_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci