import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';
import fone from '../imagens/fone.png';

class Login extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);

    this.state = {
      name: '',
      loading: false,
    };
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  async submitLogin(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    await createUser(this.state);
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { name, loading } = this.state;
    const minNameLegth = 3;

    return (
      <main data-testid="page-login" className="login-main">
        { loading ? <Loading /> : (
          <form className="login-form" onSubmit={ (event) => this.submitLogin(event) }>
            <img src={ fone } alt="audio icon" className="login-icon" />
            <label htmlFor="login">
              Login
              <input
                className="input-text"
                type="text"
                id="login"
                placeholder="Nome"
                value={ name }
                onChange={ this.onInputChange }
                data-testid="login-name-input"
              />
            </label>
            <button
              className="login-button"
              type="submit"
              id="enter-button"
              disabled={ name.length < minNameLegth }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        )}
      </main>
    );
  }
}

Login.defaultProps = {
  history: {},
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Login;
