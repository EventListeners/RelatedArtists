const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'artists' });

const cassandraCSV = (tableName, columns, filePath, ind) => new Promise ((resolve, reject) => {
  const query = `COPY ${tableName} ${columns} FROM ${filePath}${ind}.csv WITH HEADER = TRUE;`;
  client.execute(query)
    .then(() => resolve());
})

const makeManyCSV = async (tableName, columns, filePath) => {
  for (let i = 1; i <= 1; i++) {
    await cassandraCSV(tableName, columns, filePath, i);
  }
}

makeManyCSV('artists','(artist_name,listeners,pic_url,song)', './artistData/artist');