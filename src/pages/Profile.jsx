import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.importUserData();
  }

  importUserData = async () => {
    const userData = await getUser();
    this.setState({ isLoading: false, userData });
  };

  render() {
    const { isLoading, userData: { description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <Link to="/profile/edit">Editar perfil</Link>

            <p>{ description }</p>
          </div>) }
      </div>
    );
  }
}

export default Profile;
