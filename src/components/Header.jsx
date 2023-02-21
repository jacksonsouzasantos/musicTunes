import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.userData = this.userData.bind(this);

    this.state = {
      name: 'Usuário',
      loading: true,
    };
  }

  componentDidMount() {
    this.userData();
  }

  async userData() {
    const userObj = await getUser();
    this.setState({
      name: userObj.name,
      loading: userObj.loading,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component" className="header-section">
        {(loading ? <Loading />
          : (
            <div>
              <section>
                <div data-testid="header-user-name" className="render-login-name">
                  Olá
                  <br />
                  { name }

                </div>
              </section>
              <section className="nav-bar">
                <div className="nav-link">
                  <Link to="/search" data-testid="link-to-search">Search</Link>
                </div>
                <div className="nav-link">
                  <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                </div>
                <div className="nav-link">
                  <Link to="/profile" data-testid="link-to-profile">Profile</Link>
                </div>
              </section>
            </div>)
        )}
      </header>
    );
  }
}

export default Header;
