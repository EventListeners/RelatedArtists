DROP KEYSPACE IF EXISTS artists;
CREATE KEYSPACE artists
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

USE artists;

DROP TABLE IF EXISTS artists.artists;
CREATE TABLE artists.artists (
  artist_id int,
  related_artists text,
  PRIMARY KEY (artist_id)
);
