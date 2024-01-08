-- MySQL dump 10.13  Distrib 8.1.0, for Linux (aarch64)
--
-- Host: vps.ngxhuyhoang.com    Database: eshop_database
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `eshop_database`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `eshop_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `eshop_database`;

--
-- Table structure for table `__migrations`
--

DROP TABLE IF EXISTS `__migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__migrations`
--

LOCK TABLES `__migrations` WRITE;
/*!40000 ALTER TABLE `__migrations` DISABLE KEYS */;
INSERT INTO `__migrations` VALUES (1,1695179561859,'Migration1695179561859'),(2,1695182055137,'Migration1695182055137');
/*!40000 ALTER TABLE `__migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_date` datetime(6) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `is_verified` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `IDX_54115ee388cdb6d86bb4bf5b2e` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'2023-10-01 06:29:56.897329','2023-10-04 03:40:33.000000',NULL,'hoangnh0099','hoangnh0099@gmail.com','$2b$10$Nv6CWlYU9AaY3yuNJmwbKOsl89MWCNX7k.LbhFiPMZVIN49vSKY7O','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiaG9hbmduaDAwOTlAZ21haWwuY29tIiwiaWF0IjoxNjk2MzkwODMzLCJleHAiOjE2OTg5ODI4MzN9.MqIZYORdO9qK1kCWxQlADC0rwrtKy0DXqZ_5GAZNJxA',1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_manage`
--

DROP TABLE IF EXISTS `link_manage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `link_manage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_date` datetime(6) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `profile_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_aa0480ab2acd53354e847d2938` (`id`),
  KEY `FK_6e42ead644693645aa3242099bc` (`profile_id`),
  CONSTRAINT `FK_6e42ead644693645aa3242099bc` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_manage`
--

LOCK TABLES `link_manage` WRITE;
/*!40000 ALTER TABLE `link_manage` DISABLE KEYS */;
INSERT INTO `link_manage` VALUES (1,'2023-10-01 08:11:31.370990','2023-10-01 11:35:01.574169',NULL,'website','https://github.com/ngxhuyhoang',1),(2,'2023-10-02 09:25:53.043165','2023-10-02 09:27:38.000000','2023-10-02 09:27:38.000000','Test','https://www.youtube.com',1),(3,'2023-10-02 09:27:19.004842','2023-10-03 15:12:56.000000','2023-10-03 15:12:56.000000','Test2','https://www.facebook.com',1);
/*!40000 ALTER TABLE `link_manage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_date` datetime(6) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a39874be76793f8a9be22dcf4d` (`account_id`),
  KEY `IDX_3dd8bfc97e4a77c70971591bdc` (`id`),
  CONSTRAINT `FK_a39874be76793f8a9be22dcf4df` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'2023-10-01 06:29:56.950435','2023-10-01 15:00:43.101301',NULL,'Hoang Nguyen Huy','https://i.pravatar.cc/150?u=a042581f4e29026704d\n',NULL,1);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socials`
--

DROP TABLE IF EXISTS `socials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_date` datetime(6) DEFAULT NULL,
  `social_name` enum('github','facebook','twitter','instagram','linkedin','youtube') NOT NULL,
  `url` varchar(255) NOT NULL,
  `profile_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_5e3ee018e1b66c619ae3d3b330` (`id`),
  KEY `FK_b834b8175fce37e483141a7948c` (`profile_id`),
  CONSTRAINT `FK_b834b8175fce37e483141a7948c` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socials`
--

LOCK TABLES `socials` WRITE;
/*!40000 ALTER TABLE `socials` DISABLE KEYS */;
INSERT INTO `socials` VALUES (1,'2023-10-01 07:11:13.453679','2023-10-01 11:33:13.535385','2023-10-01 08:18:29.000000','facebook','https://www.facebook.com/',1),(2,'2023-10-01 07:36:34.653104','2023-10-02 17:50:27.690116',NULL,'facebook','https://facebook.com/ngxhuyhoanga/',1),(3,'2023-10-01 07:37:14.460825','2023-10-01 08:44:42.000000','2023-10-01 08:44:42.000000','facebook','Dfbkidfbdofb',1),(4,'2023-10-01 08:10:30.068518','2023-10-01 08:35:32.000000','2023-10-01 08:35:32.000000','facebook','Dfbdfbdfb',1),(5,'2023-10-02 13:16:42.973292','2023-10-02 17:48:32.000000','2023-10-02 17:48:32.000000','facebook','hoangnh0099@gmail.com',1),(6,'2023-10-02 13:21:16.757594','2023-10-02 17:48:39.000000','2023-10-02 17:48:39.000000','facebook','hoangnh0099@gmail.com',1),(7,'2023-10-02 17:51:08.988946','2023-10-02 17:51:08.988946',NULL,'twitter','https://twitter.com/hoangnh0099',1);
/*!40000 ALTER TABLE `socials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-04  3:56:52
