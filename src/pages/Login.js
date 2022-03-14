import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

const userAPI = require('../services/userAPI');

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      name: '',
      loading: false,
      clicked: false,
    };
  }

  handleChange = ({ target: { value } }) => {
    const nameLength = value.length;
    const minLength = 3;
    this.setState({ name: value,
      disabled: nameLength < minLength });
  }

  saveUser = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await userAPI.createUser({ name });
    this.setState({ loading: false, clicked: true });
  }

  render() {
    const { name, disabled, clicked, loading } = this.state;
    return (
      <>
        {loading ? <Loading /> : (
          <div data-testid="page-login">
            <h1>Login</h1>
            <form>
              <input
                type="text"
                data-testid="login-name-input"
                placeholder="Nome"
                value={ name }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ disabled }
                onClick={ this.saveUser }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        {clicked && <Redirect to="/search" /> }
      </>
    );
  }
}
export default Login;
