-- MySQL dump 10.13  Distrib 5.1.41, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: commoncensus
-- ------------------------------------------------------
-- Server version	5.1.41-3ubuntu12.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `ROWID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Author` int(11) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Body` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ROWID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (2,3,'2010-06-27 19:55:03','AAA','BBB'),(3,3,'2010-06-27 19:57:06','AAA','BBB'),(4,3,'2010-06-27 19:57:24','AAA','BBB'),(5,3,'2010-06-27 20:10:17','like apples','mmmm'),(6,3,'2010-06-30 00:04:09','i care for the elderly','it\'s hard, but at the end of the day, I feel like I\'ve really made a difference.'),(7,3,'2010-06-30 00:30:18','makes my heart sing','when my loving wife Nicole sings a lullaby to our daughter, Vivienne.  It\'s like a spring full of fresh, beautiful water flows forward from the inner recesses of a lush, verdant grove, and beckons me to join and share in it\'s delight. '),(8,3,'2010-07-01 01:53:22','can be so hard to do','but is so important, really.');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part`
--

DROP TABLE IF EXISTS `part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part` (
  `ROWID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) DEFAULT NULL,
  `Description` text,
  `WholeCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`ROWID`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part`
--

LOCK TABLES `part` WRITE;
/*!40000 ALTER TABLE `part` DISABLE KEYS */;
INSERT INTO `part` VALUES (2,NULL,NULL,NULL),(3,NULL,NULL,NULL),(4,'clean air',NULL,NULL),(7,'healthy food',NULL,NULL),(8,'meaningful work',NULL,NULL),(9,'transportation',NULL,NULL),(10,'time to spend with family and friends',NULL,NULL),(11,'moderate temperature',NULL,NULL),(12,'a good education',NULL,NULL),(13,'the ability to participate in a democracy',NULL,NULL),(14,'medicine',NULL,NULL),(15,'clean water',NULL,NULL),(16,'protection from the elements',NULL,NULL),(17,'inspiring music',NULL,NULL),(18,'effective communication',NULL,NULL),(19,'space to grow',NULL,NULL),(20,'random non-essential',NULL,NULL),(21,'bogus need',NULL,NULL),(22,'a',NULL,NULL),(23,'b',NULL,NULL),(24,'c',NULL,NULL),(25,'d',NULL,NULL),(26,'e',NULL,NULL),(27,'f',NULL,NULL),(28,'laughter and humor',NULL,NULL),(29,'space & time to grow',NULL,NULL),(30,'being held',NULL,NULL),(31,'falling in love',NULL,NULL),(32,'getting hurt',NULL,NULL),(33,'breaking a leg',NULL,NULL),(34,'aa',NULL,NULL),(35,'c',NULL,NULL),(36,'believing in something greater than yourself',NULL,NULL),(37,'being a part of something greater than yourself',NULL,NULL),(38,'listening',NULL,NULL),(39,'learning something new every day',NULL,NULL),(40,'currency',NULL,NULL),(41,'police stations',NULL,NULL),(42,'fire stations',NULL,NULL),(43,'roads',NULL,NULL),(44,'education',NULL,NULL),(45,'cars',NULL,NULL),(48,'discovery of essential goods and services',NULL,NULL),(51,'physical intimacy',NULL,NULL),(55,'family',NULL,2),(53,'friends',NULL,2),(58,'fast and comfortable bicycle',NULL,NULL),(59,'nutritious and delicious food',NULL,2),(60,'solitude and nature',NULL,2),(61,'a fun and interesting party',NULL,2),(62,NULL,NULL,NULL),(63,NULL,NULL,NULL);
/*!40000 ALTER TABLE `part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part_comments`
--

DROP TABLE IF EXISTS `part_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part_comments` (
  `Parent_Id` int(11) DEFAULT NULL,
  `Child_Id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part_comments`
--

LOCK TABLES `part_comments` WRITE;
/*!40000 ALTER TABLE `part_comments` DISABLE KEYS */;
INSERT INTO `part_comments` VALUES (62,2),(63,3),(16,4),(7,5),(8,6),(17,7),(18,8);
/*!40000 ALTER TABLE `part_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `ROWID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `DataValue` varchar(500) DEFAULT NULL,
  `DataKey` varchar(500) DEFAULT NULL,
  `Created` datetime DEFAULT NULL,
  PRIMARY KEY (`ROWID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uid_gencomment`
--

DROP TABLE IF EXISTS `uid_gencomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uid_gencomment` (
  `key` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uid_gencomment`
--

LOCK TABLES `uid_gencomment` WRITE;
/*!40000 ALTER TABLE `uid_gencomment` DISABLE KEYS */;
INSERT INTO `uid_gencomment` VALUES (1),(2),(3),(4),(5),(6),(7),(8);
/*!40000 ALTER TABLE `uid_gencomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uid_genpart`
--

DROP TABLE IF EXISTS `uid_genpart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uid_genpart` (
  `key` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uid_genpart`
--

LOCK TABLES `uid_genpart` WRITE;
/*!40000 ALTER TABLE `uid_genpart` DISABLE KEYS */;
INSERT INTO `uid_genpart` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31),(32),(33),(34),(35),(36),(37),(38),(39),(40),(41),(42),(43),(44),(45),(46),(47),(48),(49),(50),(51),(52),(53),(54),(55),(56),(57),(58),(59),(60),(61),(62),(63);
/*!40000 ALTER TABLE `uid_genpart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uid_genuserprofile`
--

DROP TABLE IF EXISTS `uid_genuserprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uid_genuserprofile` (
  `key` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uid_genuserprofile`
--

LOCK TABLES `uid_genuserprofile` WRITE;
/*!40000 ALTER TABLE `uid_genuserprofile` DISABLE KEYS */;
INSERT INTO `uid_genuserprofile` VALUES (1),(2),(3),(4),(5);
/*!40000 ALTER TABLE `uid_genuserprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uid_genwhole`
--

DROP TABLE IF EXISTS `uid_genwhole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uid_genwhole` (
  `key` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uid_genwhole`
--

LOCK TABLES `uid_genwhole` WRITE;
/*!40000 ALTER TABLE `uid_genwhole` DISABLE KEYS */;
INSERT INTO `uid_genwhole` VALUES (1),(2),(3),(4),(5),(6),(7);
/*!40000 ALTER TABLE `uid_genwhole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofile`
--

DROP TABLE IF EXISTS `userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userprofile` (
  `ROWID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `FacebookUid` bigint(20) DEFAULT NULL,
  `Name` varchar(500) DEFAULT NULL,
  `Link` varchar(500) DEFAULT NULL,
  `AccessToken` varchar(500) DEFAULT NULL,
  `Whole` int(11) DEFAULT NULL,
  PRIMARY KEY (`ROWID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofile`
--

LOCK TABLES `userprofile` WRITE;
/*!40000 ALTER TABLE `userprofile` DISABLE KEYS */;
INSERT INTO `userprofile` VALUES (3,661262963,'Meba Gary Foreeba','http://www.facebook.com/bennidhamma','100107273374268|2._ubQoa6UodFAH1hp6KBa3Q__.3600.1277013600-661262963|K0131QbtqGX1U0BmA-goG-ciEms.',2),(4,729895934,'Joseph Wright','http://www.facebook.com/joejoejoew','100107273374268|2.gIOEXXv2nUuTlIceKUOjng__.3600.1277596800-729895934|CdLWwP35NOGsXHBePzLZ27mx6Oc.',6),(5,0,NULL,NULL,NULL,7);
/*!40000 ALTER TABLE `userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whole`
--

DROP TABLE IF EXISTS `whole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `whole` (
  `ROWID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) DEFAULT NULL,
  `Description` text,
  PRIMARY KEY (`ROWID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whole`
--

LOCK TABLES `whole` WRITE;
/*!40000 ALTER TABLE `whole` DISABLE KEYS */;
INSERT INTO `whole` VALUES (2,'Meba Gary Foreeba\'s Essential Life List','To be sure, many people can (and do everyday) survive with fewer than the factors I enumerate here.  In light of that, it might seem that this list is perhaps superflous.  And yet, I would argue that a life without these elements is truly untenable, and that perhaps this list (or a list like this one) might someday serve as a universal bill of needs.'),(3,NULL,NULL),(4,NULL,NULL),(5,NULL,NULL),(6,'Joseph Wright\'s Essential List for Life',NULL),(7,'\'s Essential List for Life',NULL);
/*!40000 ALTER TABLE `whole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whole_parts`
--

DROP TABLE IF EXISTS `whole_parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `whole_parts` (
  `Parent_Id` int(11) DEFAULT NULL,
  `Child_Id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whole_parts`
--

LOCK TABLES `whole_parts` WRITE;
/*!40000 ALTER TABLE `whole_parts` DISABLE KEYS */;
INSERT INTO `whole_parts` VALUES (3,2),(4,3),(5,4),(2,60),(2,53),(2,7),(2,59),(2,9),(2,10),(2,11),(2,44),(2,28),(2,14),(2,15),(2,16),(2,17),(2,18),(2,29),(2,37),(2,38),(6,55),(2,40),(2,48),(2,42),(2,43),(2,51),(6,53),(6,59),(6,58),(6,60),(6,61),(2,58),(2,55),(2,61);
/*!40000 ALTER TABLE `whole_parts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2010-07-05 18:29:53
