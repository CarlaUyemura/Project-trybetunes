import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { getAlbum } = this.props;
    return (
      <div>
        {
          getAlbum.filter((album) => (album.kind === 'song')).map((album) => (
            <div key={ album.trackTimeMillis }>
              <h4>{album.trackName}</h4>
              <audio data-testid="audio-component" src={ album.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
            </div>
          ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  getAlbum: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default MusicCard;
