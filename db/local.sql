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

LOCK TABLES `useraccount` WRITE;
/*!40000 ALTER TABLE `useraccount` DISABLE KEYS */;
INSERT INTO `useraccount` VALUES (1,'ian.jo@gmail.com','password','ian.jo23@gmail.com','Ian','Jo','12345','M','+63 9087654321',468432000000,'0','0',1512763400407,1512763400407),(2,'eugene.sanchez@gmail.com','password','eugene.sanchez@gmail.com','Eugene','Sanchez','6548','M','+63 9087658965',468432000000,'0','0',1512763400407,1512763400407);
/*!40000 ALTER TABLE `useraccount` ENABLE KEYS */;
UNLOCK TABLES;
