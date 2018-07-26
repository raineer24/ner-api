/* DATABASE */
CREATE DATABASE nerapi CHARACTER SET = 'utf16' COLLATE = 'utf16_bin';

/* userAccount */
CREATE TABLE nerapi.userAccount
(id BIGINT(50) NOT NULL AUTO_INCREMENT,
role_id BIGINT(10) NOT NULL,
username CHAR(60) NOT NULL,
password VARCHAR(250) NOT NULL,
email CHAR(100),
firstName CHAR(50) NOT NULL,
lastName CHAR(50) NOT NULL,
uiid CHAR(150),
gender CHAR(10),
mobileNumber CHAR(20),
dateCreated BIGINT(50) NOT NULL,
dateUpdated BIGINT(50) NOT NULL,
status CHAR(20),
PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf16