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
  `dateCreated` bigint(50) NOT NULL,
  `dateUpdated` bigint(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccount`
--

