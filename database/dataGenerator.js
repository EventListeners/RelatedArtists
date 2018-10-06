let mysql = require ('mysql');
let faker = require ('faker');

let connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'artists',
});

let results = [];
for (let k = 0; k < 101; k++) {
  results.push ({
    artist_name: faker.name.findName (),
    listeners: faker.random.number (),
    artist_image: `https://s3.amazonaws.com/spotifyphotos/${k % 39 + 1}.jpg`,
    popularSong: faker.lorem.word (),
  });
}

console.log (results[1]);

for (let j = 0; j < results.length; j++) {
  connection.query (
    `INSERT INTO artist (artist_name, listeners, artist_image, popularSong) VALUES("${results[j].artist_name}", "${results[j].listeners}", "${results[j].artist_image}", "${results[j].popularSong}")`,
    function (error, result, fields) {
      if (error) {
        console.log (error);
      }
    }
  );
}

for (let i = 1; i < 101; i++) {
  let insertCount = 1;
  let uniqueIdArr = [];
  let k = 0;
  while (k < 10) {
    let randomId = Math.floor (Math.random () * Math.floor (100));
    if (randomId === i) {
      continue;
    } else {
      k++;
      uniqueIdArr.push (randomId);
    }
  }
  console.log ('i= ' + i + '   ' + uniqueIdArr);
  while (insertCount < 11) {
    connection.query (
      `INSERT INTO relatedArtists (related_Artist_ID, main_Artist_ID) VALUES("${uniqueIdArr[insertCount - 1]}",  ${i})`,
      function (error, result, fields) {
        if (error) {
          console.log (error);
        }
      }
    );
    insertCount++;
  }
}
