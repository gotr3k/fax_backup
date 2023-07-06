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
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeFullName` varchar(255) DEFAULT NULL,
  `subjectCode` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `fileName` varchar(255) DEFAULT NULL,
  `filePath` varchar(255) DEFAULT NULL,
  `fileSize` int DEFAULT NULL,
  `uploadDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (16,'Boško Nikolić','13E113PIA','P','PIA_Lekcija1_Uvod.pdf','files/76093326-1761-4d49-8e54-b58a7b7a2749.pdf',2943295,'2021-02-26','2021-02-26 11:49:22','2021-02-26 11:49:22');
INSERT INTO `files` VALUES (17,'Boško Nikolić','13E113PIA','P','PIA_Lekcija2_Servleti.pdf','files/332bff21-e52b-4e69-8483-2adfd69302a1.pdf',598029,'2021-02-26','2021-02-26 11:49:32','2021-02-26 11:49:32');
INSERT INTO `files` VALUES (18,'Boško Nikolić','13E113PIA','P','PIA_Lekcija3_JSP.pdf','files/ae931eed-63ac-4518-9352-2048c75145c8.pdf',1181243,'2021-02-26','2021-02-26 11:49:37','2021-02-26 11:49:37');
INSERT INTO `files` VALUES (19,'Boško Nikolić','13E113PIA','P','PIA_Lekcija4_JSF.pdf','files/143c6c38-b10c-4251-86a6-50ef39834946.pdf',1975824,'2021-02-26','2021-02-26 11:49:42','2021-02-26 11:49:42');
INSERT INTO `files` VALUES (20,'Boško Nikolić','13E113PIA','P','PIA_Lekcija5-AJAX.ppt','files/ad308284-6851-4784-9f49-d787e0577eea.ppt',1568256,'2021-02-26','2021-02-26 11:49:47','2021-02-26 11:49:47');
INSERT INTO `files` VALUES (21,'Boško Nikolić','13E113PIA','P','PIA_Lekcija7-Realizacija_Web_servisa.pdf','files/ba2d3652-bc3c-445a-9e25-59f6f828dd6a.pdf',808124,'2021-02-26','2021-02-26 11:49:54','2021-02-26 11:49:54');
INSERT INTO `files` VALUES (22,'Boško Nikolić','13E113PIA','P','si4pia_Angular7-P1-P3.pdf','files/49d7fcef-59ee-4117-bc68-9081fe52cc58.pdf',2801109,'2021-02-26','2021-02-26 11:50:03','2021-02-26 11:50:03');
INSERT INTO `files` VALUES (23,'Boško Nikolić','13E113PIA','P','si4pia_NodeJS.pdf','files/23e265f8-3b7a-47f7-b68c-0455dce09208.pdf',1833329,'2021-02-26','2021-02-26 11:50:07','2021-02-26 11:50:07');
INSERT INTO `files` VALUES (24,'Dražen Drašković','13E113PIA','D','2020_21_Projekat_januarsko_februarski.pdf','files/e7baf1fa-a040-4ebe-b3ac-fb1c6534dc6c.pdf',445581,'2021-02-26','2021-02-26 11:57:35','2021-02-26 11:57:35');
INSERT INTO `files` VALUES (25,'Dražen Drašković','13E113PIA','Q','PIA_2019_11_23_SI_K1.pdf','files/b5651dd2-c4a5-40b2-b75a-edc184db45c5.pdf',137680,'2021-02-26','2021-02-26 11:58:15','2021-02-26 11:58:15');
INSERT INTO `files` VALUES (26,'Dražen Drašković','13E113PIA','Q','PIA_2020_01_09_SI_K2.pdf','files/b8b1d2ae-61c7-4fd4-a6a1-b001a05ff337.pdf',108282,'2021-02-26','2021-02-26 11:58:19','2021-02-26 11:58:19');
INSERT INTO `files` VALUES (27,'Dražen Drašković','13E113PIA','Q','PIA_SI_ispit_januar2020.pdf','files/eb10c24e-5976-4b85-837b-491c06a7c5d8.pdf',163146,'2021-02-26','2021-02-26 11:58:34','2021-02-26 11:58:34');
INSERT INTO `files` VALUES (28,'Dražen Drašković','13E113PIA','V','HTML_Primeri.zip','files/6cfe1032-0a3d-474f-ab50-391e1083bd0c.zip',702739,'2021-02-26','2021-02-26 11:59:33','2021-02-26 11:59:33');
INSERT INTO `files` VALUES (29,'Dražen Drašković','13E113PIA','V','PIA_Vezbe1_HTML.pdf','files/9e6d5fc9-3990-4422-8482-ce3e60319e6f.pdf',642040,'2021-02-26','2021-02-26 11:59:42','2021-02-26 11:59:42');
INSERT INTO `files` VALUES (30,'Dražen Drašković','13E113PIA','V','PIA_Vezbe2_HTML.pdf','files/d67d6899-089b-4e64-9e75-4e179b48347c.pdf',390214,'2021-02-26','2021-02-26 11:59:46','2021-02-26 11:59:46');
INSERT INTO `files` VALUES (31,'Dražen Drašković','13E113PIA','V','PIA_Vezbe3_HTML.pdf','files/a7a346d5-74bf-4b26-b770-0365e891d511.pdf',765658,'2021-02-26','2021-02-26 11:59:50','2021-02-26 11:59:50');
INSERT INTO `files` VALUES (32,'Dražen Drašković','13E113PIA','L','lab2_resenje.zip','files/266c852c-51b6-4ce1-b9a0-cfee0a3be591.zip',20260,'2021-02-26','2021-02-26 12:00:26','2021-02-26 12:00:26');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-26 14:49:25
