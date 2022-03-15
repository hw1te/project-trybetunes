import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      artist: '',
      loading: false,
      searched: '',
      albums: [],
    };
  }

  handleChange = ({ target: { value } }) => {
    const nameLenght = value.length;
    const minLength = 2;
    this.setState({ artist: value, disabled: nameLenght < minLength });
  }

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({ artist: '', loading: true, searched: artist });
    const album = await searchAlbumsAPI(artist);
    this.setState({ albums: album, loading: false });
  }

  render() {
    const { disabled, artist, loading, searched, albums } = this.state;
    return (
      <>
        {loading ? <Loading />
          : (
            <div data-testid="page-search">
              <Header />
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Faça uma pesquisa"
                value={ artist }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </div>) }
        { (albums.length > 0 ? (
          <div>
            <h2>
              {`Resultado de álbuns de: ${searched}`}
            </h2>
            {albums.map((album) => (
              <div key={ album.artistName }>
                <Link
                  key={ album.artistName }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  { album.collectionName }
                </Link>
              </div>))}
          </div>) : (<h2>Nenhum álbum foi encontrado</h2>))}
      </>
    );
  }
}

export default Search;
