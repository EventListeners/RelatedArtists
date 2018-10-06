import React from 'react';
import RelatedArtistEntry from './relatedArtistEntry.jsx';
import styles from './styles/relatedArtist.css';
import CSSModules from 'react-css-modules';

const RelatedArtists = props => (
  <div styleName="RAContainer">
    {props.relatedArtists.map ((artistEntry, index) => (
      <div key={index}>
        <RelatedArtistEntry artist={artistEntry} />
      </div>
    ))}
  </div>
);

export default CSSModules (RelatedArtists, styles);
