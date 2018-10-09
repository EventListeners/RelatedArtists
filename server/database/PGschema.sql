\c artists

DROP TABLE IF EXISTS artists;
CREATE TABLE artists (
  artist_ID SERIAL PRIMARY KEY,
  artist_name VARCHAR(40) NOT NULL,
  listeners INTEGER NOT NULL,
  pic_url VARCHAR(100) NOT NULL,
  song VARCHAR(20)
);

DROP TABLE IF EXISTS related_artists;
CREATE TABLE related_artists (
  artist_ID INTEGER NOT NULL,
  related_ID INTEGER NOT NULL
);