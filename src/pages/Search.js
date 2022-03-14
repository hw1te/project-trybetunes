import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      artist: '',
    };
  }

  handleChange = ({ target: { value } }) => {
    const nameLenght = value.length;
    const minLength = 2;
    this.setState({ artist: value, disabled: nameLenght < minLength });
  }

  render() {
    const { disabled, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Nome do artista."
          value={ artist }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
