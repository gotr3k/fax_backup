-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: rti-baza
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `subjectemployeelists`
--

DROP TABLE IF EXISTS `subjectemployeelists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectemployeelists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeUsername` varchar(255) NOT NULL,
  `subjectId` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `group` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectemployeelists`
--

LOCK TABLES `subjectemployeelists` WRITE;
/*!40000 ALTER TABLE `subjectemployeelists` DISABLE KEYS */;
INSERT INTO `subjectemployeelists` VALUES (29,'mvt@etf.bg.ac.rs',68,'P',1,'2021-02-26 11:33:44','2021-02-26 11:33:44');
INSERT INTO `subjectemployeelists` VALUES (30,'jeca@etf.bg.ac.rs',68,'P',2,'2021-02-26 11:33:44','2021-02-26 11:33:44');
INSERT INTO `subjectemployeelists` VALUES (31,'dj@etf.bg.ac.rs',68,'V',2,'2021-02-26 11:33:44','2021-02-26 11:33:44');
INSERT INTO `subjectemployeelists` VALUES (32,'marko.misic@etf.bg.ac.rs',68,'P',3,'2021-02-26 11:33:44','2021-02-26 11:33:44');
INSERT INTO `subjectemployeelists` VALUES (33,'jocke@etf.bg.ac.rs',68,'V',1,'2021-02-26 11:33:44','2021-02-26 11:33:44');
INSERT INTO `subjectemployeelists` VALUES (34,'aleksas@etf.bg.ac.rs',68,'V',3,'2021-02-26 11:33:44','2021-02-26 11:33:44');
INSERT INTO `subjectemployeelists` VALUES (35,'miobra@etf.bg.ac.rs',68,'V',4,'2021-02-26 11:33:44','2021-02-26 11:33:44');
INSERT INTO `subjectemployeelists` VALUES (36,'mvt@etf.bg.ac.rs',49,'P',1,'2021-02-26 11:34:25','2021-02-26 11:34:25');
INSERT INTO `subjectemployeelists` VALUES (37,'marko.misic@etf.bg.ac.rs',49,'P',2,'2021-02-26 11:34:25','2021-02-26 11:34:25');
INSERT INTO `subjectemployeelists` VALUES (38,'jeca@etf.bg.ac.rs',49,'P',3,'2021-02-26 11:34:25','2021-02-26 11:34:25');
INSERT INTO `subjectemployeelists` VALUES (39,'jocke@etf.bg.ac.rs',49,'V',1,'2021-02-26 11:34:25','2021-02-26 11:34:25');
INSERT INTO `subjectemployeelists` VALUES (40,'aleksas@etf.bg.ac.rs',49,'V',2,'2021-02-26 11:34:25','2021-02-26 11:34:25');
INSERT INTO `subjectemployeelists` VALUES (41,'miobra@etf.bg.ac.rs',49,'V',3,'2021-02-26 11:34:25','2021-02-26 11:34:25');
INSERT INTO `subjectemployeelists` VALUES (42,'dj@etf.bg.ac.rs',49,'V',4,'2021-02-26 11:34:25','2021-02-26 11:34:25');
INSERT INTO `subjectemployeelists` VALUES (43,'zaki@etf.bg.ac.rs',5,'P',1,'2021-02-26 11:36:29','2021-02-26 11:36:29');
INSERT INTO `subjectemployeelists` VALUES (44,'zarko@etf.bg.ac.rs',5,'P',2,'2021-02-26 11:36:29','2021-02-26 11:36:29');
INSERT INTO `subjectemployeelists` VALUES (45,'marija.punt@etf.bg.ac.rs',5,'P',3,'2021-02-26 11:36:29','2021-02-26 11:36:29');
INSERT INTO `subjectemployeelists` VALUES (46,'hadzic.filip@etf.bg.ac.rs',5,'V',1,'2021-02-26 11:36:29','2021-02-26 11:36:29');
INSERT INTO `subjectemployeelists` VALUES (47,'jelica@etf.bg.ac.rs',5,'V',2,'2021-02-26 11:36:29','2021-02-26 11:36:29');
INSERT INTO `subjectemployeelists` VALUES (48,'danko@etf.bg.ac.rs',5,'V',3,'2021-02-26 11:36:29','2021-02-26 11:36:29');
INSERT INTO `subjectemployeelists` VALUES (49,'aleksas@etf.bg.ac.rs',5,'V',4,'2021-02-26 11:36:29','2021-02-26 11:36:29');
INSERT INTO `subjectemployeelists` VALUES (50,'mvt@etf.bg.ac.rs',10,'P',1,'2021-02-26 11:37:23','2021-02-26 11:37:23');
INSERT INTO `subjectemployeelists` VALUES (51,'marko.misic@etf.bg.ac.rs',10,'P',2,'2021-02-26 11:37:23','2021-02-26 11:37:23');
INSERT INTO `subjectemployeelists` VALUES (52,'jeca@etf.bg.ac.rs',10,'P',3,'2021-02-26 11:37:23','2021-02-26 11:37:23');
INSERT INTO `subjectemployeelists` VALUES (53,'dj@etf.bg.ac.rs',10,'V',1,'2021-02-26 11:37:23','2021-02-26 11:37:23');
INSERT INTO `subjectemployeelists` VALUES (54,'jocke@etf.bg.ac.rs',10,'V',2,'2021-02-26 11:37:23','2021-02-26 11:37:23');
INSERT INTO `subjectemployeelists` VALUES (55,'miobra@etf.bg.ac.rs',10,'V',3,'2021-02-26 11:37:23','2021-02-26 11:37:23');
INSERT INTO `subjectemployeelists` VALUES (56,'aleksas@etf.bg.ac.rs',10,'V',4,'2021-02-26 11:37:23','2021-02-26 11:37:23');
INSERT INTO `subjectemployeelists` VALUES (57,'jocke@etf.bg.ac.rs',71,'V',2,'2021-02-26 11:38:37','2021-02-26 11:38:37');
INSERT INTO `subjectemployeelists` VALUES (58,'mvt@etf.bg.ac.rs',71,'P',1,'2021-02-26 11:38:37','2021-02-26 11:38:37');
INSERT INTO `subjectemployeelists` VALUES (59,'jeca@etf.bg.ac.rs',71,'P',2,'2021-02-26 11:38:37','2021-02-26 11:38:37');
INSERT INTO `subjectemployeelists` VALUES (60,'marko.misic@etf.bg.ac.rs',71,'P',3,'2021-02-26 11:38:37','2021-02-26 11:38:37');
INSERT INTO `subjectemployeelists` VALUES (61,'dj@etf.bg.ac.rs',71,'V',1,'2021-02-26 11:38:37','2021-02-26 11:38:37');
INSERT INTO `subjectemployeelists` VALUES (62,'miobra@etf.bg.ac.rs',71,'V',3,'2021-02-26 11:38:37','2021-02-26 11:38:37');
INSERT INTO `subjectemployeelists` VALUES (63,'aleksas@etf.bg.ac.rs',71,'V',4,'2021-02-26 11:38:37','2021-02-26 11:38:37');
INSERT INTO `subjectemployeelists` VALUES (64,'nbosko@etf.bg.ac.rs',23,'P',1,'2021-02-26 11:40:17','2021-02-26 11:40:17');
INSERT INTO `subjectemployeelists` VALUES (65,'drazen.draskovic@etf.bg.ac.rs',23,'P',2,'2021-02-26 11:40:17','2021-02-26 11:40:17');
INSERT INTO `subjectemployeelists` VALUES (66,'drazen.draskovic@etf.bg.ac.rs',23,'V',1,'2021-02-26 11:40:17','2021-02-26 11:40:17');
INSERT INTO `subjectemployeelists` VALUES (67,'jelica@etf.bg.ac.rs',23,'V',3,'2021-02-26 11:40:17','2021-02-26 11:40:17');
INSERT INTO `subjectemployeelists` VALUES (68,'sanjad@etf.bg.ac.rs',23,'V',2,'2021-02-26 11:40:17','2021-02-26 11:40:17');
/*!40000 ALTER TABLE `subjectemployeelists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-26 14:49:24
