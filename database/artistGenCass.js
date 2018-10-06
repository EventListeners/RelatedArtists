const faker = require('faker');
const fs = require('fs');

for (let k = 8; k <= 10; k++) {
  let csv = fs.createWriteStream(`./artistData/cassArtists${k}.csv`);
  csv.write('artist_id,related_artists\n')
  let str = '';
  for (let i = (1000000 * (k - 1) + 1); i <= k * 1000000; i++) {
    let relatedArtists = `[`
    artists = 0;
    while (artists < 10) {
      let artist = `{` +
        '"artist_name"' + ':"' + faker.name.firstName() + ' ' + faker.name.lastName() +'",' +
        '"listeners"' + ':' + (Math.floor(Math.random() * 8000000) + 1) + ',' +
        '"pic_url"'+ ':' + `"https://s3.us-east-2.amazonaws.com/event-listeners-relatedartists/images/${Math.floor(Math.random() * 1000)}.jpg",` +
        '"song"' + ':"' + faker.commerce.color() + `"}`;
      relatedArtists += artist;
      if (artists < 9) {
        relatedArtists += ',';
      } else {
        relatedArtists += `]`;
      }
      artists++;
    }
    str += (i + '^' + relatedArtists + '\n');
    if (i % 100 === 0) {
      csv.write(str);
      str = '';
    }
  }
}