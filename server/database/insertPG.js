const { Pool } = require('pg');
const path = require('path');

const pool = new Pool({
  host: "localhost",
  user: "Jeongdizzle",
  database: "artists",
  port: "5432",
  max: 20,
});

const copyIntoTable = (tableName, cols, ind) => new Promise((resolve, reject) => {
  let filePath = path.join(__dirname, `artistData/${tableName}${ind}.csv`);
  pool.query(`COPY ${tableName} ${cols} FROM '${filePath}' DELIMITER ',' CSV HEADER;`, (err, suc) => {
    if (err) {
      console.log(filePath + err);
    } else {
      console.log('Success' + filePath);
      resolve();
    }
  });
});

const copyManyCSV = async (tableName, colName) => {
  for (let i = 1; i <= 10; i++) {
    await copyIntoTable(tableName, colName, i);
  }
};

const insertPG = async () => {
  console.log('adding artists');
  await copyManyCSV('artists', '(artist_name,listeners,pic_url,song)')
  console.log('adding relatedArtists');
  await copyManyCSV('related_artists', '(artist_ID,related_ID)');
  console.log('Creating Index for related_artists');
  await pool.query(`CREATE INDEX related_index ON related_artists (artist_ID)`);
  console.log('Clustering related_artists by related_index');
  await pool.query('CLUSTER related_artists USING related_index');
  console.log('Creating Index for artists');
  await pool.query('CREATE INDEX artist_index ON artists (artist_id)');
  console.log('Clustering artists by artist_index');
  await pool.query('CLUSTER artists USING artist_index');
  pool.end(() => {console.log('Pool has ended')});
}
insertPG();




