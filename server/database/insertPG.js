const { Pool } = require('pg');
const path = require('path');

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password",
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
  for (let i = 7; i <= 10; i++) {
    await copyIntoTable(tableName, colName, i);
  }
};

const insertPG = async () => {
  // console.log('adding artists');
  // await copyManyCSV('artists', '(artist_name,listeners,pic_url,song)')
  // console.log('adding relatedArtists');
  // await copyManyCSV('related_artists', '(artist_ID,related_ID)');
  console.log('Creating Index for related_artists');
  await pool.query(`CREATE INDEX related_index ON related_artists USING HASH (artist_ID)`);
  console.log('Creating Index for artists');
  await pool.query('CREATE INDEX artist_index ON artists USING HASH (artist_id)');
  pool.end(() => {console.log('Pool has ended')});
}
insertPG();




