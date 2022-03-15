import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  checkedFavoriteSong = async (target) => {
    this.setState({ loading: true, checked: true });
    const fetchSong = getMusics(target.id);
    await addSong(fetchSong[0]);
    this.setState({ loading: false });
    console.log(addSong(fetchSong[0]));
  };

  render() {
    const { data: { trackName, previewUrl, trackId } } = this.props;
    const { loading, checked } = this.state;
    return (
      loading ? <Loading />
        : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id={ trackId }
                type="checkbox"
                value={ checked }
                checked={ checked }
                onChange={ this.checkedFavoriteSong }
              />
            </label>
          </div>)
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
