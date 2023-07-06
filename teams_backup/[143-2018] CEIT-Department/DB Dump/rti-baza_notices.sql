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
-- Table structure for table `notices`
--

DROP TABLE IF EXISTS `notices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` int NOT NULL,
  `notice` text NOT NULL,
  `date` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notices`
--

LOCK TABLES `notices` WRITE;
/*!40000 ALTER TABLE `notices` DISABLE KEYS */;
INSERT INTO `notices` VALUES (5,'Lacus viverra vitae congue eu',2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet nulla malesuada pellentesque elit. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Arcu dictum varius duis at consectetur lorem donec massa sapien. Eget egestas purus viverra accumsan in. Amet massa vitae tortor condimentum lacinia quis vel eros. Aliquet risus feugiat in ante metus. Quis auctor elit sed vulputate mi. Dui faucibus in ornare quam viverra. Pretium vulputate sapien nec sagittis. Senectus et netus et malesuada fames ac turpis egestas. Lacus viverra vitae congue eu. Malesuada fames ac turpis egestas.','2019-12-12','2021-02-15 18:25:32','2021-02-15 18:25:32');
INSERT INTO `notices` VALUES (6,'Arcu dictum varius',1,'Enim sit amet venenatis urna cursus eget nunc scelerisque viverra. Hendrerit gravida rutrum quisque non tellus orci ac auctor. Vestibulum lectus mauris ultrices eros in cursus. Dignissim sodales ut eu sem integer vitae justo eget magna. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. ','2020-12-14','2021-02-15 18:26:18','2021-02-15 18:26:18');
INSERT INTO `notices` VALUES (8,'Vel fringilla est ullamcorper eget nulla facilisi',2,'Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Nunc consequat interdum varius sit amet. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Consectetur adipiscing elit ut aliquam purus sit. Odio ut sem nulla pharetra diam. Malesuada fames ac turpis egestas. Gravida in fermentum et sollicitudin. Laoreet id donec ultrices tincidunt arcu. Consectetur purus ut faucibus pulvinar elementum. Est velit egestas dui id ornare arcu odio ut. Eu ultrices vitae auctor eu augue ut.','2021-01-09','2021-02-15 18:27:30','2021-02-15 18:27:30');
INSERT INTO `notices` VALUES (9,'Pharetra diam sit amet nisl',4,'Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis.','2021-01-19','2021-02-15 18:28:06','2021-02-15 18:28:06');
INSERT INTO `notices` VALUES (10,'Pretium nibh ipsum consequat nisl vel',4,'Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Laoreet sit amet cursus sit amet dictum sit amet. Pellentesque sit amet porttitor eget. Amet purus gravida quis blandit turpis cursus. Pretium nibh ipsum consequat nisl vel. Neque viverra justo nec ultrices dui sapien eget mi proin. Tincidunt dui ut ornare lectus sit amet est placerat in.','2021-02-11','2021-02-15 18:28:41','2021-02-15 18:28:41');
INSERT INTO `notices` VALUES (11,'Mattis nunc sed blandit libero volutpat sed 2021',3,'Purus semper eget duis at tellus at urna condimentum mattis. Eu lobortis elementum nibh tellus molestie nunc non. Eu nisl nunc mi ipsum faucibus vitae. Volutpat sed cras ornare arcu dui vivamus. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Urna id volutpat lacus laoreet non curabitur. Eget mi proin sed libero enim. Mattis enim ut tellus elementum sagittis vitae et leo duis. Mattis nunc sed blandit libero volutpat sed. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Massa enim nec dui nunc. Non blandit massa enim nec dui. Sagittis aliquam malesuada bibendum arcu vitae.','2021-02-03','2021-02-15 18:29:13','2021-02-15 19:44:36');
INSERT INTO `notices` VALUES (12,'Aliquam purus sit amet luctus venenatis lectus magna fringilla',1,'Ultricies integer quis auctor elit sed vulputate mi. Proin libero nunc consequat interdum varius. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Nisl vel pretium lectus quam id leo in vitae. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Enim nunc faucibus a pellentesque sit amet porttitor. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Sociis natoque penatibus et magnis dis parturient montes. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Vitae aliquet nec ullamcorper sit amet. Pellentesque adipiscing commodo elit at imperdiet. Risus viverra adipiscing at in. Aliquam purus sit amet luctus venenatis lectus magna fringilla. Etiam dignissim diam quis enim.','2020-12-01','2021-02-15 18:45:23','2021-02-15 18:45:23');
INSERT INTO `notices` VALUES (13,'Eget gravida cum sociis natoque penatibus et magnis',2,'Commodo sed egestas egestas fringilla phasellus. Quis auctor elit sed vulputate mi. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Imperdiet dui accumsan sit amet nulla facilisi. Eget gravida cum sociis natoque penatibus et magnis.','2020-11-01','2021-02-15 18:46:16','2021-02-15 18:46:16');
INSERT INTO `notices` VALUES (14,'Accumsan lacus vel facilisis volutpat',1,'Est ante in nibh mauris cursus mattis. Nulla malesuada pellentesque elit eget gravida. Facilisis gravida neque convallis a cras semper. Nec sagittis aliquam malesuada bibendum arcu vitae. Sed libero enim sed faucibus. Pellentesque massa placerat duis ultricies. Id porta nibh venenatis cras sed. Non sodales neque sodales ut etiam sit amet nisl purus. Blandit aliquam etiam erat velit scelerisque. At lectus urna duis convallis. Massa placerat duis ultricies lacus sed.','2021-02-15','2021-02-15 19:56:20','2021-02-15 19:56:20');
/*!40000 ALTER TABLE `notices` ENABLE KEYS */;
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
