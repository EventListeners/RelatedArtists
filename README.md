# Event Listeners

> Backend Services for a music streaming end service. The servers have been set up to handle thousands of requests per second with a database containing over 10 million entries. The RelatedArtists module is for displaying the artists that may be similar to a given artist.

## Related Projects

  - https://github.com/EventListeners/AlbumList-MusicPlayer
  - https://github.com/EventListeners/PopularSongs

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> The server & database for this project has been configured to serve JSON data for the frontend Webpack bundle files, which have not been provided. Populate the database and run npm start to start this service on localhost:3002.
> The endpoint of '/artists/relatedArtists/:id' with 'id' being a specific artist's id will retrieve the related artists for that artist.

## Requirements
> Node v 10.14.0 was used for this project. Any node version with async, await functionality will work as well.
  
## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

