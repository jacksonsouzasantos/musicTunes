// import React from 'react';
// import Header from '../components/Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import Loading from '../components/Loading';
// import Card from '../components/Card';

// class Search extends React.Component {
//   constructor() {
//     super();

//     this.handleChange = this.handleChange.bind(this);
//     this.searchAlbum = this.searchAlbum.bind(this);

//     this.state = {
//       search: '',
//       curSearch: '',
//       loading: false,
//       albums: [],
//       notFound: false,
//     };
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }

//   async searchAlbum(event) {
//     event.preventDefault();
//     const { search } = this.state;
//     this.setState({
//       loading: true,
//       curSearch: search,
//     });
//     const result = await searchAlbumsAPI(search);

//     if (result.length > 0) {
//       this.setState({
//         search: '',
//         loading: false,
//         albums: result,
//         notFound: false,
//       });
//     } else {
//       this.setState({
//         search: '',
//         loading: false,
//         notFound: true,
//       });
//     }
//   }

//   render() {
//     const { search, curSearch, loading, albums, notFound } = this.state;
//     const minNameSearch = 2;
//     const NOT_FOUND = 'Nenhum álbum foi encontrado';
//     let buttonSearchValidation = true;
//     const collection = (
//       <section>
//         { albums.map((card, index) => (
//           <div key={ index }>
//             <Card
//               cardImage={ card.artworkUrl100 }
//               collectionId={ card.collectionId }
//               cardCollection={ card.collectionName }
//               cardArtist={ card.artistName }
//             />
//           </div>
//         ))}
//       </section>
//     );

//     if (search.length >= minNameSearch) {
//       buttonSearchValidation = false;
//     }

//     return (
//       <section data-testid="page-search" className="page">
//         <Header />
//         <section className="search-section">
//           { loading ? <Loading /> : (
//             <form className="searchForm">
//               <input
//                 className="input-text"
//                 type="text"
//                 data-testid="search-artist-input"
//                 placeholder="Nome do Artista"
//                 name="search"
//                 value={ search }
//                 onChange={ this.handleChange }
//               />
//               <button
//                 className="search-button"
//                 type="submit"
//                 data-testid="search-artist-button"
//                 disabled={ buttonSearchValidation }
//                 onClick={ this.searchAlbum }
//               >
//                 Pesquisar
//               </button>
//               { albums.length !== 0 ? (
//                 <div>
//                   <p>
//                     { `Resultado de álbuns de: ${curSearch}` }
//                   </p>
//                   { collection }
//                 </div>
//               ) : null }
//               { notFound ? (
//                 <div>
//                   { NOT_FOUND }
//                 </div>
//               ) : null }
//             </form>
//           )}
//         </section>
//       </section>
//     );
//   }
// }

// export default Search;

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
            <label htmlFor="searchInput">
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
                <div>
                  {`Resultado de álbuns de: ${prevSearch}`}
                  { albums.map(({ collectionId, collectionName, artworkUrl100 }) => (
                    <div key={ collectionId }>
                      <p>{ collectionName }</p>
                      <img src={ artworkUrl100 } alt={ collectionName } />
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
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
