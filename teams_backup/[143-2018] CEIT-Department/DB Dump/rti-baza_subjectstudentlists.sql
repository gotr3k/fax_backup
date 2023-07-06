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
-- Table structure for table `subjectstudentlists`
--

DROP TABLE IF EXISTS `subjectstudentlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectstudentlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentUsername` varchar(255) NOT NULL,
  `subjectId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectstudentlists`
--

LOCK TABLES `subjectstudentlists` WRITE;
/*!40000 ALTER TABLE `subjectstudentlists` DISABLE KEYS */;
INSERT INTO `subjectstudentlists` VALUES (10,'kd170244d@student.etf.rs',13,'2021-02-16 10:39:37','2021-02-16 10:39:37');
INSERT INTO `subjectstudentlists` VALUES (11,'fe140089p@student.etf.rs',13,'2021-02-16 10:39:37','2021-02-16 10:39:37');
INSERT INTO `subjectstudentlists` VALUES (12,'tt190012d@student.etf.rs',13,'2021-02-16 10:39:38','2021-02-16 10:39:38');
INSERT INTO `subjectstudentlists` VALUES (14,'kd170244d@student.etf.rs',16,'2021-02-16 10:39:42','2021-02-16 10:39:42');
INSERT INTO `subjectstudentlists` VALUES (15,'fe140089p@student.etf.rs',16,'2021-02-16 10:39:43','2021-02-16 10:39:43');
INSERT INTO `subjectstudentlists` VALUES (16,'fk140090p@student.etf.rs',16,'2021-02-16 10:39:43','2021-02-16 10:39:43');
INSERT INTO `subjectstudentlists` VALUES (18,'kd170244d@student.etf.rs',49,'2021-02-20 18:41:54','2021-02-20 18:41:54');
INSERT INTO `subjectstudentlists` VALUES (20,'ab150065m@student.etf.rs',49,'2021-02-20 18:41:54','2021-02-20 18:41:54');
INSERT INTO `subjectstudentlists` VALUES (21,'fe140089p@student.etf.rs',49,'2021-02-20 18:41:55','2021-02-20 18:41:55');
INSERT INTO `subjectstudentlists` VALUES (22,'fk140090p@student.etf.rs',49,'2021-02-20 18:41:55','2021-02-20 18:41:55');
INSERT INTO `subjectstudentlists` VALUES (23,'tt190012d@student.etf.rs',49,'2021-02-20 18:41:55','2021-02-20 18:41:55');
INSERT INTO `subjectstudentlists` VALUES (75,'kd170244d@student.etf.rs',5,'2021-02-26 10:45:43','2021-02-26 10:45:43');
INSERT INTO `subjectstudentlists` VALUES (79,'tt190012d@student.etf.rs',5,'2021-02-26 10:45:44','2021-02-26 10:45:44');
INSERT INTO `subjectstudentlists` VALUES (80,'kd170244d@student.etf.rs',23,'2021-02-26 10:46:18','2021-02-26 10:46:18');
INSERT INTO `subjectstudentlists` VALUES (84,'tt190012d@student.etf.rs',23,'2021-02-26 10:46:20','2021-02-26 10:46:20');
INSERT INTO `subjectstudentlists` VALUES (85,'js150601d@student.etf.rs',5,'2021-02-26 11:35:20','2021-02-26 11:35:20');
INSERT INTO `subjectstudentlists` VALUES (86,'di150433d@student.etf.rs',5,'2021-02-26 11:35:20','2021-02-26 11:35:20');
INSERT INTO `subjectstudentlists` VALUES (87,'ml180095d@student.etf.rs',5,'2021-02-26 11:35:22','2021-02-26 11:35:22');
INSERT INTO `subjectstudentlists` VALUES (88,'dn160371d@student.etf.rs',5,'2021-02-26 11:35:23','2021-02-26 11:35:23');
INSERT INTO `subjectstudentlists` VALUES (89,'js150601d@student.etf.rs',23,'2021-02-26 11:39:07','2021-02-26 11:39:07');
INSERT INTO `subjectstudentlists` VALUES (90,'di150433d@student.etf.rs',23,'2021-02-26 11:39:08','2021-02-26 11:39:08');
INSERT INTO `subjectstudentlists` VALUES (91,'ml180095d@student.etf.rs',23,'2021-02-26 11:39:08','2021-02-26 11:39:08');
INSERT INTO `subjectstudentlists` VALUES (92,'dn160371d@student.etf.rs',23,'2021-02-26 11:39:09','2021-02-26 11:39:09');
/*!40000 ALTER TABLE `subjectstudentlists` ENABLE KEYS */;
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
