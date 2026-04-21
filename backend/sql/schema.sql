-- Serendib Travel backend — MySQL schema (utf8mb4)
-- Run once against your database, e.g.:
--   mysql -u USER -p DATABASE < sql/schema.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS site_settings;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE packages (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(512) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  image TEXT NOT NULL,
  gallery JSON NOT NULL,
  duration VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  highlights JSON NOT NULL,
  itinerary JSON NOT NULL,
  inclusions JSON NOT NULL,
  exclusions JSON NOT NULL,
  category ENUM('Inbound', 'Outbound') NOT NULL,
  type ENUM('Day', 'Round') NOT NULL DEFAULT 'Day',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  localizations JSON NOT NULL,
  route JSON NULL,
  is_limited_time TINYINT(1) NOT NULL DEFAULT 0,
  discount_percentage INT UNSIGNED NOT NULL DEFAULT 0,
  expiry_date DATETIME NULL,
  seo_title VARCHAR(512) NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_packages_category (category),
  KEY idx_packages_featured_created (featured, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE bookings (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  tour_id INT UNSIGNED NOT NULL,
  tour_title VARCHAR(512) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64) NOT NULL,
  booking_date DATE NOT NULL,
  guests INT UNSIGNED NOT NULL,
  special_requests TEXT NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (id),
  KEY idx_bookings_submitted (submitted_at),
  CONSTRAINT fk_bookings_tour FOREIGN KEY (tour_id) REFERENCES packages (id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE blogs (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(512) NOT NULL,
  slug VARCHAR(512) NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  cover_image TEXT NOT NULL,
  tags JSON NOT NULL,
  category VARCHAR(255) NOT NULL DEFAULT 'Travel Tips',
  author VARCHAR(255) NOT NULL DEFAULT 'Serendib Travel',
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  seo_title VARCHAR(512) NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL,
  read_time VARCHAR(64) NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blogs_slug (slug),
  KEY idx_blogs_status_published (status, published_at, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE site_settings (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  site_id VARCHAR(64) NOT NULL,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_images JSON NOT NULL,
  about_title VARCHAR(512) NOT NULL,
  about_text TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(128) NOT NULL,
  contact_whatsapp VARCHAR(128) NOT NULL,
  contact_address TEXT NOT NULL,
  social_facebook TEXT NOT NULL,
  social_instagram TEXT NOT NULL,
  social_twitter TEXT NOT NULL,
  social_youtube TEXT NOT NULL,
  social_tripadvisor TEXT NOT NULL,
  partner_logos JSON NOT NULL,
  featured_tour_ids JSON NOT NULL,
  announcement_enabled TINYINT(1) NOT NULL DEFAULT 0,
  announcement_text TEXT NOT NULL,
  announcement_link TEXT NOT NULL,
  company_name VARCHAR(512) NOT NULL,
  company_tagline VARCHAR(512) NOT NULL,
  company_logo TEXT NOT NULL,
  footer_text TEXT NOT NULL,
  seo_title VARCHAR(512) NOT NULL,
  seo_description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_site_settings_site (site_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
