require('newrelic');
const express = require('express');
const db = require('./database/index.js');
const cors = require('cors');
const cluster = require('cluster');
const redis = require('redis');
const client = redis.createClient();
const app = express();

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log('mayday! mayday! worker', worker.id, ' is no more!');
    cluster.fork();
  });
}
else {
  app.use(cors());
  // app.use('/artists/:id', express.static(path.join(__dirname + '/../public')));
  // app.get('/artists/relatedArtists/:id', (req, res) => {
  //   const id = req.params.id;
  //   db.getRelatedArtists(id, (err, data) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     } else {
  //       res.send(data);
  //     }
  //   });
  // })

  ////// DB GET WITH REDIS ////////////
  const getArtists = (id, res) => {
    db.getRelatedArtists(id, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        client.setex(id, 3600, JSON.stringify(data));
        res.send(data);
      }
    });
  }

  app.get(`/artists/relatedArtists/:id`, (req, res) => {
    client.get(JSON.stringify(req.params.id), (err, suc) => {
      if (err) {
        throw err;
      } else if (suc != null) {
        res.send(suc);
      } else {
        getArtists(req.params.id, res);
      }
    })
  });

  // app.post('/artists/relatedArtists', (req, res) => {
  //   let artist = req.body.artist;
  //   let related = req.body.related
  //   db.addNewArtist(artist, related, (err, suc) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     } else {
  //       res.status(201).send('Successful Insertion of new Artist');
  //     }
  //   });
  // });

  // app.put('/artists/relatedArtists/:id', (req, res) => {
  //   let id = req.params.id;
  //   let update = req.body.update;
  //   db.updateArtist(id, update, (err, suc) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     } else {
  //       res.status(202).send('Successful Update');
  //     }
  //   });
  // });

  // app.delete('/artists/relatedArtists/:id', (req, res) => {
  //   let id = req.params.id;
  //   db.deleteArtist(id, (err, suc) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     } else {
  //       res.status(202).send('Successful Deletion');
  //     }
  //   });
  // });

  const port = process.env.port || 3002;
  app.listen(port, () => {
    // console.log('listening on port ', port);
    console.log(`${cluster.worker.id} is listening on ${port} broski`);
  });
}