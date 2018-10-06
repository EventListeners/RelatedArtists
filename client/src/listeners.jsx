import React from 'react';
import styles from './styles/relatedArtist.css';
import CSSModules from 'react-css-modules';

const Listeners = props => (
  <div className="RAListeners">
    {props.artist.listeners.toString ().replace (/\B(?=(\d{3})+(?!\d))/g, ',')}
  </div>
);

export default CSSModules (Listeners, styles);
