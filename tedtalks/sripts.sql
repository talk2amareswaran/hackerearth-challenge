create database tedtalks;
use tedtalks;

CREATE TABLE `talks` (
  `description` text,
  `event` varchar(255) DEFAULT NULL,
  `main_speaker` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `published_date` int(11) DEFAULT NULL,
  `ratings` text,
  `related_talks` text,
  `speaker_occupation` varchar(255) DEFAULT NULL,
  `tags` text,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `view` int(11) DEFAULT NULL);

LOAD DATA LOCAL INFILE 'C:/talk2amareswaran-downloads/TED-22kDataba41455/TED-22kData.csv' 
INTO TABLE talks
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;