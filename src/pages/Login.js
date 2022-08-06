import React from 'react';
import { Redirect } from 'react-router-dom';
import Load from './Load';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      user: '',
      redirectSearch: false,
    };
  }

  verificaInput = ({ target }) => {
    const numMin = 3;
    if (target.value.length >= numMin) {
      this.setState({
        buttonDisabled: false,
        user: target.value,
      });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  click = async () => {
    this.setState({
      loading: true,
    });
    const { user } = this.state;
    await createUser({ name: user });
    this.setState({
      loading: false,
      redirectSearch: true,
    });
  }

  render() {
    const { buttonDisabled, loading, redirectSearch } = this.state;
    if (redirectSearch) {
      return <Redirect to="/search" />;
    }
    if (loading) {
      return <Load />;
    }
    return (
      <main>
        <div
          className="container-login"
          data-testid="page-login"
        >
          <h1>TrybeTunes</h1>
          <label htmlFor="login">
            <input
              placeholder="Digite seu nome"
              type="text"
              data-testid="login-name-input"
              onChange={ this.verificaInput }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ this.click }
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }
}

export default Login;
