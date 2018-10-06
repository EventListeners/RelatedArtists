DROP DATABASE IF EXISTS artists;
CREATE DATABASE IF NOT EXISTS artists;
USE artists;
CREATE TABLE IF NOT EXISTS artist (
  artistID INT AUTO_INCREMENT PRIMARY KEY,
  artist_name VARCHAR(40) NOT NULL,
  listeners INT,
  artist_image VARCHAR(70) NOT NULL,
  popularSong VARCHAR(130) NOT NULL
);

DROP TABLE IF EXISTS relatedArtists;
		
CREATE TABLE relatedArtists (
   id INT AUTO_INCREMENT PRIMARY KEY,
   related_Artist_ID INT NOT NULL,
   main_Artist_ID INT NOT NULL,
   FOREIGN KEY (related_Artist_ID) REFERENCES artist(artistID),
   FOREIGN KEY (main_Artist_ID) REFERENCES artist(artistID)
 );

