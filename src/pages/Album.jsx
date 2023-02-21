// import React from 'react';
// import propTypes from 'prop-types';
// import Header from '../components/Header';
// import getMusics from '../services/musicsAPI';
// import MusicCard from '../components/MusicCard';

// class Album extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       artistName: '',
//       albumName: '',
//       musics: [],
//     };
//   }

//   componentDidMount() {
//     this.musicData();
//   }

//   musicData = async () => {
//     const { match: { params: { id } } } = this.props;
//     const album = await getMusics(id);

//     this.setState({
//       artistName: album[0].artistName,
//       albumName: album[0].collectionName,
//       musics: [...album],
//     });
//   };

//   render() {
//     const { artistName, albumName, musics } = this.state;
//     return (
//       <div data-testid="page-album">
//         <Header />
//         <h1 data-testid="artist-name">{ artistName }</h1>
//         <h2 data-testid="album-name">{ albumName }</h2>
//         <MusicCard musics={ musics } />
//       </div>
//     );
//   }
// }

// Album.propTypes = {
//   match: propTypes.shape({
//     params: propTypes.shape({
//       id: propTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };

// export default Album;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistMusics: [],
      albumData: '',
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match } = this.props;
    const [albumData, ...artistMusics] = await getMusics(match.params.id);
    this.setState({
      artistMusics: [...artistMusics],
      albumData,
    });
  };

  render() {
    const { artistMusics, albumData } = this.state;
    return (
      <div data-testid="page-album" className="page-album">
        <Header />
        <div className="songs-container">
          <div className="page-title">
            <h2 data-testid="artist-name">{albumData.artistName}</h2>
            <h3 data-testid="album-name">{albumData.collectionName}</h3>
          </div>
          {artistMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              musicData={ music }
            />
          ))}
        </div>
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
