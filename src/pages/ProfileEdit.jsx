import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      gotUser: false,
      isDisabled: true,
      userUpdated: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const userData = await getUser();
    this.setState({
      gotUser: true,
      name: !userData.name ? '' : userData.name,
      email: !userData.email ? '' : userData.email,
      description: !userData.description ? '' : userData.description,
      image: !userData.image ? '' : userData.image,
    });
  };

  verifyKeys = () => {
    const { name, description, image, email } = this.state;
    const minKeysLength = 3;
    if (name.length >= minKeysLength
      && description.length >= minKeysLength
      && image.length >= minKeysLength
      && email.length >= minKeysLength) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyKeys);
  };

  handleButton = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { name, description, image, email } = this.state;
      const userDataEdited = {
        name,
        description,
        image,
        email,
      };
      await updateUser(userDataEdited);
      this.setState({
        loading: false,
        userUpdated: true,
      });
    });
  };

  render() {
    const {
      loading,
      gotUser,
      isDisabled,
      name,
      email,
      description,
      image,
      userUpdated } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <section className="edit-profile">
          {gotUser
        && (
          <form className="edit-profile-form">
            <label htmlFor="name-input-edit">
              Name:
              <input
                className="input-text"
                data-testid="edit-input-name"
                type="text"
                name="name"
                id="name-input-edit"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label
              data-testid="edit-input-email"
              htmlFor="email-input-edit"
            >
              E-mail:
              <input
                className="input-text"
                type="email"
                id="email-input-edit"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label
              data-testid="edit-input-description"
              htmlFor="description-input-edit"
            >
              Description:
              <textarea
                className="input-text"
                type="textarea"
                id="description-input-edit"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label
              data-testid="edit-input-image"
              htmlFor="image-input-edit"
            >
              Picture:
              <input
                className="input-text"
                type="text"
                id="image-input-edit"
                name="image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onClick={ this.handleButton }
            >
              Salvar alterações
            </button>
          </form>
        )}
          {userUpdated && <Redirect to="/profile" />}
        </section>
      </div>
    );
  }
}

export default ProfileEdit;
