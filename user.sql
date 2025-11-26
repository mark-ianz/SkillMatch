CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` enum('male','female','prefer not to say','') NOT NULL,
  `birthdate` date NOT NULL,
  `street_name` varchar(100) DEFAULT NULL,
  `house_number` varchar(10) NOT NULL,
  `subdivision` varchar(100) DEFAULT NULL,
  `postal_code` varchar(4) NOT NULL,
  `barangay` varchar(255) DEFAULT NULL,
  `city_municipality` varchar(255) DEFAULT NULL,
  `region` varchar(255) NOT NULL DEFAULT 'NCR',
  `phone_number` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
