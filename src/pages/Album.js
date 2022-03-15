import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      artist: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.getMusicApi();
  }

  getMusicApi = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const result = data.slice(1);
    console.log(result);
    this.setState({
      songs: result,
      artist: data[0].artistName,
      albumName: data[0].collectionName,
    });
  }

  render() {
    const { artist, albumName, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="album-name">{ albumName }</span>
        <p data-testid="artist-name">{ artist }</p>
        {songs.map((song) => (
          <MusicCard
            key={ song.trackId }
            data={ song }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
