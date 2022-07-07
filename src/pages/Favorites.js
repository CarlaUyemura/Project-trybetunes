import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Load from './Load';

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
          <section>
            <h2>Músicas Favoritas</h2>
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
          </section>
        )}
    </div>
  );
}
}

export default Favorites;
