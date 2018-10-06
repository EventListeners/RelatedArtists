import React from 'react';
import {Popover} from 'react-bootstrap';
import styles from './styles/relatedArtist.css';
import CSSModules from 'react-css-modules';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';

const PopularSong = props => {
  let styles = {
    backgroundColor: 'rgb(25, 25, 25)',
    display: 'flex',

    justifyContent: 'center',
    position: 'relative',
    positionLeft: '200',
    marginTop: '3%',

    whiteSpace: 'nowrap',
    width: '100px !important',
  };
  let styles2 = {
    maxWidth: '120%',
  };
  let styles3 = {
    marginRight: '7%',
  };
  return (
    <div>
      <Popover id="popover-positioned-right" style={styles}>
        <div style={styles2}>
          <FontAwesomeIcon icon={faPlayCircle} style={styles3} />
          {props.artist.song}
        </div>
      </Popover>

    </div>
  );
};

export default CSSModules (PopularSong, styles);
