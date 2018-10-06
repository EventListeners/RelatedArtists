DROP DATABASE IF EXISTS artists;
CREATE DATABASE artists;
\c artists

DROP TABLE IF EXISTS artists CASCADE;
CREATE TABLE IF NOT EXISTS artists (
  artist_ID SERIAL PRIMARY KEY,
  artist_name VARCHAR(50),
  listeners INTEGER,
  pic_url VARCHAR(400),
  song VARCHAR(30)
);

DROP TABLE IF EXISTS related_artists;
CREATE TABLE IF NOT EXISTS related_artists (
  artist_ID INTEGER,
  related_ID INTEGER
);