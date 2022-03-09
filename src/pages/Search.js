import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      disabled: true,
      albums: [],
      searching: '',
      requested: false,
    };
  }

  componentDidMount() {
    this.cleanRequest();
  }

  handleChange = ({ target: { value } }) => {
    const nameLength = value.length;
    const minLength = 2;
    this.setState({ artist: value,
      disabled: nameLength < minLength });
  }

  cleanRequest = async () => {
    const { artist } = this.state;
    this.setState({ artist: '', loading: true, searching: artist });
    if (this.componentDidMount) {
      const album = await searchAlbumsAPI(artist);
      this.setState({ requested: true, loading: false, albums: album });
    }
  }

  render() {
    const { artist,
      disabled,
      loading,
      requested,
      searching,
      albums,
    } = this.state;
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
                onClick={ this.cleanRequest }
              >
                Pesquisar
              </button>
            </div>) }
        { (requested)
        && (albums.length > 0 ? (
          <div>
            <h2>
              Resultado de álbuns de:
              { searching }
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
