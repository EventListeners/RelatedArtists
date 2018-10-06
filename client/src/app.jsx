import React from 'react';
import RelatedArtists from './relatedArtist.jsx';
import CSSModules from 'react-css-modules';
import styles from './styles/relatedArtist.css';
import axios from 'axios';

class RelatedArtistsApp extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      relatedArtists: [],
      toggleArtistList: false,
      label: '',
    };
    this.renderArtists = this.renderArtists.bind (this);
    this.renderButton = this.renderButton.bind (this);
    this.getRelatedArtists = this.getRelatedArtists.bind (this);
    this.moreArtistsHandleClick = this.moreArtistsHandleClick.bind (this);
  }
  componentDidMount () {
    let id = Math.floor (Math.random () * 100) + 1;
    this.setState ({
      label: 'MORE ARTISTS',
    });
    this.getRelatedArtists (id);
  }

  getRelatedArtists (id) {
    let context = this;
    axios
      .get (`/artists/relatedArtists/${id}`)
      .then (response => {
        context.setState ({
          relatedArtists: response.data,
        });
      })
      .catch (function (error) {
        console.log (error);
      });
  }

  moreArtistsHandleClick () {
    if (this.state.toggleArtistList === false) {
      this.setState ({
        label: 'LESS ARTISTS',
        toggleArtistList: !this.state.toggleArtistList,
      });
    } else {
      this.setState ({
        label: 'MORE ARTISTS',
        toggleArtistList: !this.state.toggleArtistList,
      });
    }
  }

  renderArtists () {
    let firstFiveArtists = [];
    for (let i = 0; i < this.state.relatedArtists.length; i++) {
      if (i < 5) firstFiveArtists.push (this.state.relatedArtists[i]);
    }
    if (this.state.toggleArtistList === false) {
      return (
        <div styleName="rap">
          <h1 style={{fontWeight: '700'}}>Fans Also Like</h1>
          <RelatedArtists relatedArtists={firstFiveArtists} />
        </div>
      );
    } else {
      return (
        <div styleName="rap">
          <h1 style={{fontWeight: '700'}}>Fans Also Like</h1>
          <RelatedArtists relatedArtists={this.state.relatedArtists} />
        </div>
      );
    }
  }

  renderButton () {
    return (
      <button
        type="button"
        styleName="RAButton"
        onClick={this.moreArtistsHandleClick}
      >
        {this.state.label}
      </button>
    );
  }

  render () {
    return (
      <div styleName="rap">
        {this.renderArtists ()}
        {this.renderButton ()}
      </div>
    );
  }
}

export default CSSModules (RelatedArtistsApp, styles);
