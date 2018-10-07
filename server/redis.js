const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
  console.log('Connected To Redis');
});
client.on('error', err => {
  console.log(`ERROR: ${err}`);
});