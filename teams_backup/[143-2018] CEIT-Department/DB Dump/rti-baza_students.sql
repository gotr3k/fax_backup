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
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `index` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (36,'kd170244d@student.etf.rs','kd170244d1','2017/0244','d','Dimitrije','Knežević',1,'2021-02-16 09:30:34','2021-02-23 09:06:11');
INSERT INTO `students` VALUES (38,'ab150065m@student.etf.rs','ab150065m1','2015/0065','m','Branislav','Aleksić',1,'2021-02-16 09:31:32','2021-02-24 07:33:36');
INSERT INTO `students` VALUES (39,'gb120401d@student.etf.rs','gb120401d','2012/0401','d','Budimir','Grom',0,'2021-02-16 09:32:41','2021-02-16 09:35:26');
INSERT INTO `students` VALUES (40,'fe140089p@student.etf.rs','fe140089p','2014/0089','p','Eva','Fizlić',1,'2021-02-16 09:33:36','2021-02-16 09:33:36');
INSERT INTO `students` VALUES (41,'fk140090p@student.etf.rs','fk140090p','2014/0090','p','Kristina','Fizlić',1,'2021-02-16 09:34:03','2021-02-16 09:34:03');
INSERT INTO `students` VALUES (42,'tt190012d@student.etf.rs','tt190012d','2019/0012','d','Taroslav','Tejić',1,'2021-02-16 09:35:11','2021-02-16 09:35:11');
INSERT INTO `students` VALUES (43,'js150601d@student.etf.rs','js150601d','2015/0601','d','Stanko','Jakov',1,'2021-02-26 10:56:21','2021-02-26 10:56:21');
INSERT INTO `students` VALUES (44,'di150433d@student.etf.rs','di150433d','2015/0433','d','Ivan','Dimitrijević',1,'2021-02-26 10:56:53','2021-02-26 10:56:53');
INSERT INTO `students` VALUES (45,'ml180095d@student.etf.rs','ml180095d1','2018/0095','d','Lara','Mitrović',1,'2021-02-26 10:57:23','2021-02-26 13:26:09');
INSERT INTO `students` VALUES (46,'gs140043m@student.etf.rs','gs140043m','2014/0043','m','Saša','Gorgijevski',1,'2021-02-26 10:58:04','2021-02-26 10:58:04');
INSERT INTO `students` VALUES (47,'dn160371d@student.etf.rs','dn160371d','2016/0037','d','Nikola','Đurković',1,'2021-02-26 10:58:49','2021-02-26 10:58:49');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
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
