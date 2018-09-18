-- MySQL dump 10.16  Distrib 10.2.10-MariaDB, for osx10.13 (x86_64)
--
-- Host: localhost    Database: nerapi
-- ------------------------------------------------------
-- Server version	10.2.10-MariaDB

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
-- Table structure for table `useraccount`
--

DROP TABLE IF EXISTS `useraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useraccount` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT,
  `username` char(60) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` char(100) DEFAULT NULL,
  `firstName` char(50) NOT NULL,
  `lastName` char(50) NOT NULL,
  `uiid` char(150) DEFAULT NULL,
  `gender` char(10) DEFAULT NULL,
  `mobileNumber` char(20) DEFAULT NULL,
  `birthdate` bigint(50) DEFAULT NULL,
  `deactivated` char(1) DEFAULT '0',
  `forcedReset` char(1) DEFAULT '0',
  `role_id` bigint(50) DEFAULT 0,
  `lastLogin` bigint(50) DEFAULT 0,
  `dateCreated` bigint(50) NOT NULL,
  `dateUpdated` bigint(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccount`
--

LOCK TABLES `useraccount` WRITE;
/*!40000 ALTER TABLE `useraccount` DISABLE KEYS */;
INSERT INTO `useraccount` VALUES (1,'ian.jo@gmail.com','password','ian.jo23@gmail.com','Ian','Jo','12345','M','+63 9087654321',468432000000,'0','0',1,0,1512763400407,1512763400407),(2,'eugene.sanchez@gmail.com','password','eugene.sanchez@gmail.com','Eugene','Sanchez','6548','M','+63 9087658965',468432000000,'0','0',1,0,1512763400407,1512763400407),(3,'test','123','eugene.sanchez@gmail.com','Anghelita','Maria','5468','F','+63 9087658645',468432000000,'0','0',1,0,1512763400407,1512763400407);
/*!40000 ALTER TABLE `useraccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT,
  `name` char(100) NOT NULL,
  `dateCreated` bigint(50) NOT NULL,
  `dateUpdated` bigint(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES
(1,'EOS Developer',1521072000000,1521072000000),(2,'EOS Admin',1521072000000,1521072000000),(3,'Partner Seller - Admin',1521072000000,1521072000000),(4,'Partner Seller - Coordinator',1521072000000,1521072000000),(5,'Partner Seller - Finance',1521072000000,1521072000000),(6,'Partner Seller - Management',1521072000000,1521072000000),(7,'Partner Buyer - Admin',1521072000000,1521072000000),(8,'Partner Buyer - Finance',1521072000000,1521072000000),(9,'Partner Seller - Assembly',1521072000000,1521072000000),(10,'Partner Seller - Delivery',1521072000000,1521072000000),(11,'EOS Customer Support 1',1521072000000,1521072000000),(12,'EOS Customer Support 2',1521072000000,1521072000000),(13,'EOS Finance',1521072000000,1521072000000);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;