import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Card from '../components/Card';

class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.searchAlbum = this.searchAlbum.bind(this);

    this.state = {
      search: '',
      curSearch: '',
      loading: false,
      albums: [],
      notFound: false,
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async searchAlbum(event) {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      loading: true,
      curSearch: search,
    });
    const result = await searchAlbumsAPI(search);

    if (result.length > 0) {
      this.setState({
        search: '',
        loading: false,
        albums: result,
        notFound: false,
      });
    } else {
      this.setState({
        search: '',
        loading: false,
        notFound: true,
      });
    }
  }

  render() {
    const { search, curSearch, loading, albums, notFound } = this.state;
    const minNameSearch = 2;
    const NOT_FOUND = 'Nenhum álbum foi encontrado';
    let buttonSearchValidation = true;
    const collection = (
      <section>
        { albums.map((card, index) => (
          <div key={ index }>
            <Card
              cardImage={ card.artworkUrl100 }
              collectionId={ card.collectionId }
              cardCollection={ card.collectionName }
              cardArtist={ card.artistName }
            />
          </div>
        ))}
      </section>
    );

    if (search.length >= minNameSearch) {
      buttonSearchValidation = false;
    }

    return (
      <section data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              name="search"
              value={ search }
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ buttonSearchValidation }
              onClick={ this.searchAlbum }
            >
              Pesquisar
            </button>
            { albums.length !== 0 ? (
              <div>
                <p>
                  { `Resultado de álbuns de: ${curSearch}` }
                </p>
                { collection }
              </div>
            ) : null }
            { notFound ? (
              <div>
                { NOT_FOUND }
              </div>
            ) : null }
          </form>
        )}
      </section>
    );
  }
}

export default Search;
