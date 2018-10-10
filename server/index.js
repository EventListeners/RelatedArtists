require('newrelic');
const express = require('express');
const db = require('./database/index.js');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
// app.use('/artists/:id', express.static(path.join(__dirname + '/../public')));

app.get('/artists/relatedArtists/:id', (req, res) => {
  const id = req.params.id;
  db.getRelatedArtists(id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
})

app.post('/artists/relatedArtists', (req, res) => {
  let artist = req.body.artist;
  let related = req.body.related
  db.addNewArtist(artist, related, (err, suc) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send('Successful Insertion of new Artist');
    }
  });
});

app.put('/artists/relatedArtists/:id', (req, res) => {
  let id = req.params.id;
  let update = req.body.update;
  db.updateArtist(id, update, (err, suc) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(202).send('Successful Update');
    }
  });
});

app.delete('/artists/relatedArtists/:id', (req, res) => {
  let id = req.params.id;
  db.deleteArtist(id, (err, suc) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(202).send('Successful Deletion');
    }
  });
});

const port = process.env.port || 3002;
app.listen(port, () => {
  console.log('listening on port ', port);
});