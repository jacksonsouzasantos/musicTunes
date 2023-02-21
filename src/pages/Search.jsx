import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends React.Component {
  state = {
    searchInput: '',
    disabled: true,
    minChar: 2,
    loading: false,
    prevSearch: '',
    albums: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.btnValidate());
  };

  btnValidate = () => {
    const { searchInput, minChar } = this.state;
    return searchInput.length >= minChar
      ? this.setState({ disabled: false })
      : this.setState({ disabled: true });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(searchInput);
    this.setState({
      loading: false, prevSearch: searchInput, albums: response, searchInput: '' });
  };

  render() {
    const { searchInput, disabled, loading, prevSearch, albums } = this.state;
    if (loading) { return (<Loading />); }
    return (
      <section className="search-section">
        <Header />
        <div data-testid="page-search" className="page">
          <form className="searchForm">
            <label htmlFor="searchInput" className="searchInput">
              <input
                className="input-text"
                data-testid="search-artist-input"
                type="text"
                name="searchInput"
                value={ searchInput }
                placeholder="Nome do Artista"
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="search-button"
              data-testid="search-artist-button"
              type="submit"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
          <div>
            { albums.length === 0 ? (
              <p>
                Nenhum álbum foi encontrado
              </p>
            )
              : (
                <div className="page-album">
                  {`Resultado de álbuns de: ${prevSearch}`}
                  { albums.map(({ collectionId, collectionName, artworkUrl100 }) => (
                    <div key={ collectionId } className="songs-container">
                      <p>{ collectionName }</p>
                      <img src={ artworkUrl100 } alt={ collectionName } />
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                        className="page-title"
                      >
                        Visualização
                      </Link>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>

      </section>
    );
  }
}

export default Search;
