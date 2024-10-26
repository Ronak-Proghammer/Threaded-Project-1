CREATE TABLE `user_info` (
  `CustEmail` varchar(50) NOT NULL,
  `Password` varchar(25) NOT NULL,
  `CustomerId` int NOT NULL,
  PRIMARY KEY (`CustomerId`),
  UNIQUE KEY `CustEmail` (`CustEmail`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`CustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1