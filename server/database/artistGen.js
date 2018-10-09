const faker = require('faker');
const fs = require('fs');


for (let j = 1; j <= 10; j++) {
  const csv = fs.createWriteStream(`./artistData/artists${j}.csv`);
  csv.write('artist_name,listeners,pic_url,song\n');
  let str = '';
  for (let i = 1; i <= 1000000; i++) {
    str = str + ('' +
      faker.name.firstName() + ' ' + faker.name.lastName() + ',' +
      (Math.floor(Math.random() * 8000000) + 1) + ',' +
      `https://s3.us-east-2.amazonaws.com/event-listeners-relatedartists/images/${Math.floor(Math.random() * 1000)}.jpg,` +
      faker.commerce.color() + '\n'
    )
    if (i % 1000 === 0) {
      csv.write(str);
      str = '';
    } 
  }
  csv.end();
}

for (let k = 1; k <= 10; k++) {
  let csv = fs.createWriteStream(`./artistData/related_artists${k}.csv`);
  csv.write('artist_ID,related_ID\n')
  let str = '';
  for (let i = (1000000 * (k - 1) + 1); i <= k * 1000000; i++) {
    let seen = [i];
    while (seen.length < 11) {
      randID = Math.floor(Math.random() * 10000001 + 1);
      if (!seen.includes(randID)) {
        seen.push(randID);
        str = str + (i + ',' + randID + '\n');
      }
    }
    if (i % 1000 === 0) {
      csv.write(str);
      str = '';
    }
  }
}