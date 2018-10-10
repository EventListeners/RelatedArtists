const { Pool } = require('pg');
const poolSettings = require('./pgConnSettings.js');

const pool = new Pool(poolSettings);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const getRelatedArtists = function (id, showArtistCB) {
  let sqlQuery =
    `SELECT artist_name, listeners, pic_url, song
    FROM artists 
    WHERE artist_id IN
      (SELECT related_id
      FROM related_artists
      WHERE artist_id = ${id})`;
  pool.connect()
    .then(client => {
      return client.query(sqlQuery)
        .then(data => {
          client.release();
          showArtistCB(null, data.rows);
        })
        .catch(err => {
          showArtistCB(err, null);
        });
    })

};

const addNewArtist = (artist, insertArtistCB) => {
  let query =
    `INSERT INTO artists
    VALUES (DEFAULT, "${artist.artist_name}", ${artist.listeners}, "${artist.pic_url}", "${artist.song}")`;
  pool.query(query)
    .then(suc => { insertArtistCB(null, 'Inserted the new Artist') })
    .catch(err => { insertArtistCB(err) })
};


const deleteArtist = (id, deleteArtistCB) => {
  let query =
    `DELETE FROM artists
    WHERE artist_id = ${id}`;
  pool.query(query)
    .then(suc => { deleteArtist(null, `Successfully delete artist with id = ${id}`) })
    .catch(err => { deleteArtistCB(err) })
}

module.exports.getRelatedArtists = getRelatedArtists;
