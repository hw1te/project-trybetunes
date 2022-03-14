import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.setState = {
      songs: [],
      artist: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.getMusicApi();
  }

  getMusicApi = async () => {
    const { id } = this.props;
    const data = await getMusics(id);
    console.log(data);
    this.setState({
      songs: data,
      artist: data.artistName[0],
      albumName: data.collectionName[0],
    });
  }

  render() {
    const { artist, albumName, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="album-name">{ albumName }</span>
        <p data-testid="artist-name">{ artist }</p>
        { songs.map((song) => (
          <MusicCard key={ song } song={ song } />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Album;
