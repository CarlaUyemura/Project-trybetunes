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
  const teste = musics.some((item) => item.trackId === data.trackId);
  if (!teste) {
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
      <h2>Lista de Músicas</h2>
      { loading ? <Load />
        : (
          <section>
            <div>
              <img src={ album.artworkUrl100 } alt="Imagem do Album" />
              <h2 data-testid="album-name">{album.collectionName}</h2>
              <h3 data-testid="artist-name">{album.artistName}</h3>
            </div>
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
          </section>
        )}
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
