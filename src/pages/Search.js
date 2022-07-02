import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
    };
  }

  verificaInput = ({ target }) => {
    const numMin = 2;
    if (target.value.length >= numMin) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        <form>
          <label htmlFor="input-search">
            <input
              data-testid="search-artist-input"
              type="text"
              id="input-search"
              placeholder="Nome do Artista"
              onChange={ this.verificaInput }
            />
          </label>

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
