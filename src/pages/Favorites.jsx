import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteMusics: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  componentDidUpdate() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favoriteMusics: [...favorites],
    });
  };

  render() {
    const { favoriteMusics } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Suas músicas favoritas:</h2>
        <MusicCard musics={ favoriteMusics } />
      </div>
    );
  }
}

export default Favorites;
