import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const {
      trackName,
      trackId,
      previewUrl,
      data,
      checkFavorite,
      musics,
    } = this.props;
    const favorite = musics.some((item) => item.trackId === trackId);
    return (
      <div>
        <div className="container-music-un">
          <h4>{trackName}</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>

          <label
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            className="container-favorite"
          >

            <input
              type="checkbox"
              id={ trackId }
              name={ trackName }
              checked={ favorite }
              onChange={ () => checkFavorite(data) }
            />
            {' '}
            Favorita

          </label>
        </div>

      </div>
    );
  }
}

MusicCard.propTypes = {
  getAlbum: PropTypes.arrayOf(PropTypes.object),
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
  trackName: PropTypes.string,
  trackTimeMillis: PropTypes.string,
}.isRequired;

export default MusicCard;
