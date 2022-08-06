import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Load from './Load';
import music from '../img/music.png';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

getFavorites = async () => {
  this.setState({
    loading: true,
  });
  const musicsLocal = await getFavoriteSongs();
  this.setState({
    musics: musicsLocal,
    loading: false,
  });
}

checkFavorite = async (data) => {
  const { musics } = this.state;
  const verificaMusic = musics.some((item) => item.trackId === data.trackId);
  if (verificaMusic) {
    this.setState({
      loading: true,
    });
    await removeSong(data);
    this.setState({
      musics: [...await getFavoriteSongs()],
      loading: false,
    });
  }
}

render() {
  const { musics, loading } = this.state;
  return (
    <div
      data-testid="page-favorites"
    >
      <Header />
      {loading ? <Load />
        : (
          <section className="container-list">
            <h2 className="title-list">Músicas Favoritas</h2>
            <div className="container-album">
              <img src={ music } alt="Nota musical" className="img-favorite" />
              <div className="container-musics">
                {
                  musics.map((elem) => (
                    <MusicCard
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
            </div>
          </section>
        )}
    </div>
  );
}
}

export default Favorites;
