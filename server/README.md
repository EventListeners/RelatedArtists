# Related Artists Endpoints For CRUD API

## Create

Endpoint: GET '/artists/relatedArtists', inserts a new artist into the database with artist info (name, listeners, top song, photo) and related artists ids for the new artist

## Read
Endpoint: POST '/artists/relatedArtists/:id' gets all of the one artist's info and related artists

## Update
Endpoint: PATCH '/artists/relatedArtists/:id' updates parts of the artists info / related artists

## Delete
Endpoint: DELETE '/artists/relatedArtists/:id' deletes the artist from the db
