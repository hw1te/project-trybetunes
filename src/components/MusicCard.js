import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { data: { trackName, previewUrl } } = this.props;
    return (
      <div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          { trackName }
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
