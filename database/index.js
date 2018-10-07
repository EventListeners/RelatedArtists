const { Pool } = require('pg');
const path = require('path');

const pool = new Pool({
  "host": "localhost",
  "user": "Jeongdizzle",
  "database": "artists",
  "port": "5432"
});

const getRelatedArtists = function (id, showArtistCB) {
  let sqlQuery =
    `SELECT artist_name, listeners, pic_url, song
    FROM artists 
    WHERE artist_id IN
      (SELECT related_id
      FROM related_artists
      WHERE artist_id = ${id})`;
  pool.query(sqlQuery)
    .then(suc => {showArtistCB(null, suc)})
    .catch(err => {showArtistCB(err)});
};

const addNewArtist = (artist, insertArtistCB) => {
  let query =
    `INSERT INTO artists
    VALUES (DEFAULT, "${artist.artist_name}", ${artist.listeners}, "${artist.pic_url}", "${artist.song}")`;
  pool.query(query)
    .then(suc => {insertArtistCB(null, 'Inserted the new Artist')})
    .catch(err => {insertArtistCB(err)})
};

const updateArtist = (id, update, updateArtistCB) => {
  let query = 
    `UPDATE artists 
    SET (artist_name, listeners, pic_url, song) = (${update.artist_name}, ${update.listeners}, ${update.pic_url}, ${update.song})
    WHERE artist_id = ${id}`;
  pool.query(query)
    .then(suc => {updateArtistCB(null, `Updated the artist with id = ${id}`)})
    .catch(err => {updateArtistCB(err)});
};

const deleteArtist = (id, deleteArtistCB) => {
  let query = 
    `DELETE FROM artists
    WHERE artist_id = ${id}`;
  pool.query(query)
    .then(suc => {deleteArtist(null, `Successfully delete artist with id = ${id}`)})
    .catch(err => {deleteArtistCB(err)})
}

module.exports.getRelatedArtists = getRelatedArtists;
