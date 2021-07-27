CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40),
  `image` VARCHAR(60),
  `email` VARCHAR(40),
  `password` VARCHAR(60),
  `permission` ENUM('regular', 'owner', 'admin') NOT NULL DEFAULT 'regular',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `restaurants` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `ownerId` INT(11),
  `name` VARCHAR(40),
  `image` VARCHAR(60),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `restaurantId` INT(11),
  `reviewerId` INT(11),
  `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `rating` INT(11),
  `review` TEXT,
  `reply` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;