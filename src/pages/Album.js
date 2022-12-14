import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Load from './Load';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      getAlbum: [],
      musics: [],
    };
  }

  componentDidMount() {
    this.listMusics();
    this.getLocalMusics();
  }

 listMusics = async () => {
   const { match } = this.props;
   const music = await getMusics(match.params.id);
   this.setState({
     getAlbum: music,
     album: music[0],
   });
 }

getLocalMusics = async () => {
  const musicLocal = await getFavoriteSongs();
  this.setState({
    musics: [...musicLocal],
  });
}

checkFavorite = async (data) => {
  const { musics } = this.state;
  this.setState({
    loading: true,
  });
  const verificaMusic = musics.some((item) => item.trackId === data.trackId);
  if (!verificaMusic) {
    await addSong(data);
    this.setState({
      musics: [...await getFavoriteSongs()],
      loading: false,
    });
  } else {
    await removeSong(data);
    this.setState({
      musics: [...await getFavoriteSongs()],
      loading: false,
    });
  }
}

render() {
  const { album, getAlbum, loading, musics } = this.state;
  return (
    <div
      data-testid="page-album"
    >
      <Header />
      <div className="container-list">
        <h2 className="title-list">Lista de Músicas</h2>
        { loading ? <Load />
          : (
            <section className="container-album">
              <div className="container-capa">
                <img
                  src={ album.artworkUrl100 }
                  alt="Imagem do Album"
                  className="album-img"
                />
                <h2
                  data-testid="album-name"
                  className="title-album"
                >
                  {`Album: ${album.collectionName}`}

                </h2>
                <h3
                  data-testid="artist-name"
                  className="title-album"
                >
                  {`Artista:
                  ${album.artistName}`}

                </h3>
              </div>
              <div className="container-musics">
                {
                  getAlbum.filter((item) => (item.kind === 'song')).map((elem) => (
                    <MusicCard
                      getAlbum={ getAlbum }
                      loading={ loading }
                      key={ elem.trackId }
                      trackName={ elem.trackName }
                      trackId={ elem.trackId }
                      previewUrl={ elem.previewUrl }
                      checkFavorite={ this.checkFavorite }
                      musics={ musics }
                      data={ elem }
                    />
                  ))
                }
              </div>
            </section>
          )}
      </div>
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
