import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from './Load';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      inputValue: '',
      sectionHidden: true,
      artist: '',
      listAlbuns: '',
    };
  }

  verificaInput = ({ target }) => {
    const numMin = 2;
    this.setState({
      inputValue: target.value,
      artist: target.value,
    });
    if (target.value.length >= numMin) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  searchArtist = async () => {
    const { inputValue } = this.state;
    this.setState({
      loading: true,
    });
    const artist = await searchAlbumsAPI(inputValue);
    this.setState({
      listAlbuns: artist,
      sectionHidden: false,
      inputValue: '',
      loading: false,
    });
  }

  render() {
    const {
      buttonDisabled,
      inputValue,
      loading,
      sectionHidden,
      artist,
      listAlbuns } = this.state;

    return (
      <div
        data-testid="page-search"
      >
        <Header />
        {loading
          ? <Load />
          : (
            <div className="container-search">
              <form>
                <label htmlFor="input-search">
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    id="input-search"
                    placeholder="Nome do Artista"
                    value={ inputValue }
                    onChange={ this.verificaInput }
                  />
                </label>

                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ buttonDisabled }
                  onClick={ this.searchArtist }
                >
                  Pesquisar

                </button>
              </form>
            </div>
          )}
        <section
          hidden={ sectionHidden }
          style={ { fontSize: '30px', marginBottom: '50px', textAlign: 'center' } }
        >
          <b>
            {' '}
            {`Resultado de álbuns de: ${artist}`}
          </b>

          <div className="container-albuns">
            { listAlbuns.length === 0 ? (
              <div className="container-nenhum">Nenhum álbum foi encontrado</div>
            )
              : listAlbuns.map((album) => (

                <div
                  className="container-card"
                  key={ album.collectionId }
                >
                  <img src={ album.artworkUrl100 } alt="Imagem do Album" />
                  <p className="name">
                    <b>Album: </b>
                    {' '}
                    {album.collectionName}
                  </p>
                  <p className="name">
                    <b>Artista: </b>
                    {album.artistName}
                  </p>
                  <NavLink
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <button type="button">Ver Músicas</button>
                  </NavLink>
                </div>

              ))}
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
