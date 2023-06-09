import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../styles/Album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.musicData();
  }

  musicData = async () => {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);

    this.setState({
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
      musics: [...album],
    });
  };

  render() {
    const { artistName, albumName, musics } = this.state;
    return (
      <div data-testid="page-album" className="page-album">
        <Header />
        <div>
          <div>
            <h1 data-testid="artist-name" className="artist">{ artistName }</h1>
            <h2 data-testid="album-name" className="album">{ albumName }</h2>
            <MusicCard musics={ musics } />
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
