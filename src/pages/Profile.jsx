import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import blankProfile from '../imagens/blank-profile.png';
import '../styles/Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userData: {},
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const userData = await getUser();
      this.setState({
        loading: false,
        userData,
      });
    });
  };

  render() {
    const { loading, userData } = this.state;
    const { name, email, description } = userData;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading
          ? (<Loading />)
          : (
            <div className="profile-container">
              <div className="profile-section">
                <h2>{ name }</h2>
                <img
                  data-testid="profile-image"
                  className="profile-image"
                  src={ blankProfile }
                  alt={ name }
                />
                <h3>
                  E-mail:
                  {' '}
                  { email }
                </h3>
                <h3>
                  Description:
                  {' '}
                  { description }
                </h3>
                <Link to="/profile/edit">
                  <p className="edit-button">Edit profile</p>
                </Link>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
