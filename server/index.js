require('newrelic');
const express = require('express');
const app = express();
const db = require('../database/index.js');
const path = require('path');
const cors = require('cors');
const cluster = require('cluster');
const compression = require('compression');
var http = require('http');  
var https = require('https');
http.globalAgent.maxSockets = Infinity;  
https.globalAgent.maxSockets = Infinity;  

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;
  // console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    // console.log('mayday! mayday! worker', worker.id, ' is no more!');
    cluster.fork();
  });
}
else {
  app.use(cors());
  app.use(compression());
  // app.use('/artists/:id', express.static(path.join(__dirname + '/../public')));

  app.get(`/artists/relatedArtists/:id`, (req, res) => {
    db.getRelatedArtists(req.params.id, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(data.rows);
      }
    });
  });

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
    // console.log(`${cluster.worker.id} is listening on ${port} broski`);
  });
}