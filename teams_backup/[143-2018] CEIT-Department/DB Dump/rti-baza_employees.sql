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
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `biography` text,
  `rank` varchar(255) DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (4,'nbosko@etf.bg.ac.rs','nbosko1','Boško','Nikolić','Adresa 4, Beograd','011/3218-378','https://www.etf.bg.ac.rs/sr/fakultet/zaposleni/bosko-nikolic-2699','Boškova biografija','Redovni profesor','Zgrada \"Lola\", kancelarija 909',1,'2021-02-03 17:44:57','2021-02-26 10:20:32');
INSERT INTO `employees` VALUES (5,'bojic@etf.bg.ac.rs','bojic','Dragan','Bojić','Adresa 5, Beograd','011/3370-161','https://www.etf.bg.ac.rs/sr/fakultet/zaposleni/dragan-bojic-2682','Draganova biografija','Redovni profesor','Paviljon Rašović, kancelarija P-23',1,'2021-02-03 17:46:12','2021-02-15 21:18:01');
INSERT INTO `employees` VALUES (6,'mvt@etf.bg.ac.rs','mvt1','Milo','Tomašević','Adresa 7, Beograd','011/3218-302','https://www.etf.bg.ac.rs/sr/fakultet/zaposleni/milo-tomasevic-1441','Milova biografija','Redovni profesor','Zgrada tehničkih fakulteta, kancelarija 54a',1,'2021-02-03 17:48:41','2021-02-23 09:11:14');
INSERT INTO `employees` VALUES (7,'mbojovic@etf.bg.ac.rs','mbojovic','Miroslav','Bojović','Adresa 8, Beograd','011/3370-161','https://www.etf.bg.ac.rs/sr/fakultet/zaposleni/miroslav-bojovic-2668','Miroslavova biografija','Redovni profesor','Paviljon Rašović, kancelarija P-23',1,'2021-02-03 17:50:52','2021-02-03 17:50:52');
INSERT INTO `employees` VALUES (8,'sanja.vranes@etf.bg.ac.rs','sanja.vranes','Sanja','Vraneš','Adresa 9, Beograd','011/3218-302','https://www.etf.bg.ac.rs/sr/fakultet/zaposleni/sanja-vranes-1455','Sanjina biografija','Redovni profesor','Zgrada tehničkih fakulteta, kancelarija 54a',1,'2021-02-03 17:52:03','2021-02-03 17:52:03');
INSERT INTO `employees` VALUES (9,'dmilicev@etf.bg.ac.rs','dmilicev','Dragan','Milićev','Adresa 6, Beograd','011/3218-449','https://www.etf.bg.ac.rs/sr/fakultet/zaposleni/dragan-milicev-522','Draganova biografija','Redovni profesor','Paviljon Rašović, kancelarija P-24',1,'2021-02-03 17:53:25','2021-02-03 17:53:25');
INSERT INTO `employees` VALUES (10,'zarko@etf.bg.ac.rs','zarko','Žarko','Stanisavljević','Adresa 10, Beograd','011/3218-392','https://www.etf.bg.ac.rs/sr/fakultet/zaposleni/zarko-stanisavljevic-4268','Žarkova biografija','Vanredni profesor','Zgrada \"Lola\", kancelarija 913',1,'2021-02-03 17:54:59','2021-02-03 17:54:59');
INSERT INTO `employees` VALUES (11,'zaki@etf.bg.ac.rs','zaki','Zaharije','Radivojević','Adresa 11, Beograd','011/3218-392','https://www.etf.bg.ac.rs/sr/fakultet/zaposleni/zaharije-radivojevic-2622','Zaharijeva biografija','Vanredni profesor','Zgrada tehničkih fakulteta, kancelarija 37a',1,'2021-02-03 17:56:11','2021-02-03 17:56:11');
INSERT INTO `employees` VALUES (12,'cmilos@etf.bg.ac.rs','cmilos','Miloš','Cvetanović','Adresa 12, Beograd','011/3218-385','https://www.etf.bg.ac.rs/sr/fakultet/zaposleni/milos-cvetanovic-2336','Miloševa biografija','Vanredni profesor','Zgrada tehničkih fakulteta, kancelarija 36',1,'2021-02-03 17:57:33','2021-02-03 17:57:33');
INSERT INTO `employees` VALUES (13,'pavle.vuletic@etf.bg.ac.rs','pavle.vuletic','Pavle','Vuletić','Adresa 13, Beograd','011/3218-465','https://www.etf.bg.ac.rs/sr-lat/fakultet/zaposleni/pavle-vuletic-3097','Pajina biografija','Vanredni profesor','Zgrada \"Lola\", kancelarija 914',1,'2021-02-03 17:58:41','2021-02-03 17:58:41');
INSERT INTO `employees` VALUES (14,'slavko.gajin@etf.bg.ac.rs','slavko.gajin','Slavko','Gajin','Adresa 14, Beograd','011/3218-401','https://www.etf.bg.ac.rs/sr-lat/fakultet/zaposleni/slavko-gajin-1415','Slavkova biografija','Vanredni profesor','Zgrada \"Lola\", kancelarija 914',1,'2021-02-03 17:59:49','2021-02-03 17:59:49');
INSERT INTO `employees` VALUES (15,'drazen.draskovic@etf.bg.ac.rs','drazen.draskovic1','Dražen','Drašković','Adresa 15, Beograd','011/3218-392','https://www.etf.bg.ac.rs/sr-lat/fakultet/zaposleni/drazen-draskovic-4502','Draženova biografija','Docent','Zgrada tehničkih fakulteta, kancelarija 37b',1,'2021-02-03 18:02:01','2021-02-26 11:55:41');
INSERT INTO `employees` VALUES (16,'marija.punt@etf.bg.ac.rs','marija.punt','Marija','Punt','Adresa 16, Beograd','011/3218-392','https://www.etf.bg.ac.rs/sr-lat/fakultet/zaposleni/marija-punt-2772','Marijina biografija','Docent','Zgrada \"Lola\", kancelarija 913',1,'2021-02-03 18:03:04','2021-02-03 18:03:04');
INSERT INTO `employees` VALUES (17,'stojsasa@etf.bg.ac.rs','stojsasa','Saša','Stojanović','Adresa 17, Beograd','011/3218-385','https://www.etf.bg.ac.rs/sr-lat/fakultet/zaposleni/marija-punt-2772','Sašina biografija','Docent','Zgrada tehničkih fakulteta, kancelarija 36',1,'2021-02-03 18:04:02','2021-02-03 18:04:02');
INSERT INTO `employees` VALUES (18,'aki@etf.bg.ac.rs','aki','Adrian','Milaković','Adresa 18, Beograd',NULL,NULL,NULL,'Asistent','Zgrada \"Lola\", kancelarija 914',1,'2021-02-03 18:07:47','2021-02-03 18:07:47');
INSERT INTO `employees` VALUES (19,'jocke@etf.bg.ac.rs','jocke','Vladimir','Jocović','Adresa 19, Beograd',NULL,NULL,NULL,'Asistent','Zgrada \"Lola\", kancelarija 915',1,'2021-02-03 18:08:47','2021-02-03 18:08:47');
INSERT INTO `employees` VALUES (20,'danko@etf.bg.ac.rs','danko','Danko','Miladinović','Adresa 20, Beograd',NULL,NULL,NULL,'Asistent','Paviljon Rašović, kancelarija P-26a',1,'2021-02-03 18:09:29','2021-02-03 18:09:29');
INSERT INTO `employees` VALUES (21,'jelica@etf.bg.ac.rs','jelica','Jelica','Cincović','Adresa 21, Beograd',NULL,NULL,NULL,'Asistent','Zgrada tehničkih fakulteta, kancelarija 37a',1,'2021-02-03 18:10:53','2021-02-03 18:10:53');
INSERT INTO `employees` VALUES (22,'dj@etf.bg.ac.rs','dj','Jovan','Đukić','Adresa 22, Beograd',NULL,NULL,NULL,'Asistent','Paviljon Rašović, kancelarija P-26a',1,'2021-02-03 18:11:31','2021-02-03 18:11:31');
INSERT INTO `employees` VALUES (23,'ziza@etf.bg.ac.rs','ziza','Kristijan','Žiža','Adresa 23, Beograd',NULL,NULL,NULL,'Asistent','Paviljon Rašović, kancelarija P-23',1,'2021-02-03 18:12:04','2021-02-03 18:12:04');
INSERT INTO `employees` VALUES (24,'majav@etf.bg.ac.rs','majav','Maja','Vukasović','Adresa 24, Beograd',NULL,NULL,NULL,'Asistent','Zgrada \"Lola\", kancelarija 912',1,'2021-02-03 18:12:54','2021-02-03 18:12:54');
INSERT INTO `employees` VALUES (25,'micko@etf.bg.ac.rs','micko','Marko','Mićović','Adresa 25, Beograd',NULL,NULL,NULL,'Asistent','Zgrada \"Lola\", kancelarija 909',1,'2021-02-03 18:13:28','2021-02-03 18:13:28');
INSERT INTO `employees` VALUES (26,'milana@etf.bg.ac.rs','milana','Milana','Prodanov','Adresa 27, Beograd',NULL,NULL,NULL,'Asistent','Zgrada tehničkih fakulteta, kancelarija 18',1,'2021-02-03 18:14:00','2021-02-03 18:14:00');
INSERT INTO `employees` VALUES (27,'pedjao@etf.bg.ac.rs','pedjao','Predrag','Obradović','Adresa 28, Beograd',NULL,NULL,NULL,'Asistent','Paviljon Rašović, kancelarija P-24',1,'2021-02-03 18:14:38','2021-02-03 18:14:38');
INSERT INTO `employees` VALUES (28,'sanjad@etf.bg.ac.rs','sanjad','Sanja','Delčev','Adresa 29, Beograd',NULL,NULL,NULL,'Asistent','Zgrada \"Lola\", kancelarija 912',1,'2021-02-03 18:15:12','2021-02-03 18:15:12');
INSERT INTO `employees` VALUES (29,'stubic@etf.bg.ac.rs','stubic','Stefan','Tubić','Adresa 26, Beograd',NULL,NULL,NULL,'Asistent','Zgrada tehničkih fakulteta, kancelarija 18',1,'2021-02-03 18:16:23','2021-02-03 18:16:23');
INSERT INTO `employees` VALUES (30,'tasha@etf.bg.ac.rs','tasha','Tamara','Šekularac','Adresa 30, Beograd',NULL,NULL,NULL,'Asistent','Zgrada \"Lola\", kancelarija 909',1,'2021-02-03 18:17:14','2021-02-03 18:17:14');
INSERT INTO `employees` VALUES (31,'uki@etf.bg.ac.rs','uki','Uroš','Radenković','Adresa 31, Beograd',NULL,NULL,NULL,'Asistent','Zgrada \"Lola\", kancelarija 909',1,'2021-02-03 18:17:50','2021-02-03 18:17:50');
INSERT INTO `employees` VALUES (32,'hadzic.filip@etf.bg.ac.rs','hadzic.filip','Hadžić','Filip','Adresa 32, Beograd',NULL,NULL,NULL,'Asistent','Paviljon Rašović, kancelarija P-26a',1,'2021-02-03 18:18:21','2021-02-03 18:18:21');
INSERT INTO `employees` VALUES (33,'aleksas@etf.bg.ac.rs','aleksas','Aleksa','Srbljanović','Adresa 33, Beograd',NULL,NULL,NULL,'Saradnik u nastavi','Zgrada tehničkih fakulteta, kancelarija 37a',1,'2021-02-03 18:19:23','2021-02-03 18:19:23');
INSERT INTO `employees` VALUES (34,'balsa@etf.bg.ac.rs','balsa','Balša','Knežević','Adresa 34, Beograd',NULL,NULL,NULL,'Saradnik u nastavi','Zgrada tehničkih fakulteta, kancelarija 99',1,'2021-02-03 18:20:02','2021-02-03 18:20:02');
INSERT INTO `employees` VALUES (35,'batinic@etf.bg.ac.rs','batinic','Milica','Batinić','Adresa 35, Beograd',NULL,NULL,NULL,'Saradnik u nastavi','Zgrada tehničkih fakulteta, kancelarija 99',1,'2021-02-03 18:21:09','2021-02-03 18:21:09');
INSERT INTO `employees` VALUES (36,'miobra@etf.bg.ac.rs','miobra','Miloš','Obradović','Adresa 36, Beograd',NULL,NULL,NULL,'Saradnik u nastavi','Zgrada tehničkih fakulteta, kancelarija 99',1,'2021-02-03 18:21:35','2021-02-03 18:21:35');
INSERT INTO `employees` VALUES (37,'misa@etf.bg.ac.rs','misa','Dragiša','Miladinović','Adresa 37, Beograd',NULL,NULL,NULL,'Laboratorijski inženjer','Paviljon Rašović, kancelarija P-25',1,'2021-02-03 18:22:51','2021-02-03 18:22:51');
INSERT INTO `employees` VALUES (38,'zika@etf.bg.ac.rs','zika','Živojin','Šuštran','Adresa 38, Beograd',NULL,NULL,NULL,'Laboratorijski inženjer','Zgrada \"Lola\", kancelarija 915',1,'2021-02-03 18:24:08','2021-02-03 18:24:08');
INSERT INTO `employees` VALUES (39,'nenadko@etf.bg.ac.rs','nenadko','Nenad','Korolija','Adresa 39, Beograd',NULL,NULL,NULL,'Laboratorijski inženjer','Paviljon Rašović, kancelarija P-26',1,'2021-02-03 18:24:40','2021-02-03 18:24:40');
INSERT INTO `employees` VALUES (40,'ristob@etf.bg.ac.rs','ristob','Risto','Bošković','Adresa 40, Beograd',NULL,NULL,NULL,'Laboratorijski tehničar','Paviljon Rašović, kancelarija P-25',1,'2021-02-03 18:25:24','2021-02-03 18:25:24');
INSERT INTO `employees` VALUES (43,'jeca@etf.bg.ac.rs','jeca','Jelica','Protić','Adresa 2323','011/3218-456','https://www.etf.bg.ac.rs/sr-lat/fakultet/zaposleni/jelica-protic-2660#gsc.tab=0','Jeličina biografija','Redovni profesor','Zgrada tehničkih fakulteta, kancelarija 18',1,'2021-02-20 18:39:11','2021-02-20 18:39:11');
INSERT INTO `employees` VALUES (44,'marko.misic@etf.bg.ac.rs','marko.misic','Marko','Mišić','Adresa 1313','011/3218-392','','Markova biografija','Docent','Zgrada \"Lola\", kancelarija 916',1,'2021-02-20 18:41:00','2021-02-20 18:41:00');
INSERT INTO `employees` VALUES (47,'testslika@etf.bg.ac.rs','testslika','Test','Slika','Test','','','','Istraživač','Test',1,'2021-02-26 13:24:26','2021-02-26 13:24:26');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
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
