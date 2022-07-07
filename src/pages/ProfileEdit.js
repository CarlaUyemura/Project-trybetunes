import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Load from './Load';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
      disabledButton: true,
      description: '',
      name: '',
      email: '',
      image: '',
      redirect: false,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    this.setState({
      loading: true,
    });
    this.setState({
      user: await getUser(),
      loading: false,
    });
    this.iniciaDados();
  }

  iniciaDados = () => {
    const { user } = this.state;
    this.setState({
      description: user.description,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  }

  verificaInput = ({ target }) => {
    const { name, description, email, image } = this.state;
    this.setState({
      [target.id]: target.value,
    });
    if (name && description && email && image) {
      this.setState({
        disabledButton: false,
      });
    }
  }

  update = async () => {
    const { name, description, email, image } = this.state;
    const dados = {
      name,
      email,
      image,
      description,
    };
    this.setState({
      loading: true,
    });
    await updateUser(dados);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { loading,
      disabledButton,
      name,
      description,
      email,
      image,
      redirect,
    } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div
        data-testid="page-profile-edit"
      >
        <Header />
        {loading ? <Load />
          : (
            <section>
              <h2>Editar Perfil</h2>
              <label htmlFor="input-name">
                Nome
                <input
                  type="text"
                  id="name"
                  data-testid="edit-input-name"
                  onChange={ this.verificaInput }
                  value={ name }
                />
              </label>
              <label htmlFor="input-email">
                Email
                <input
                  type="email"
                  id="email"
                  data-testid="edit-input-email"
                  onChange={ this.verificaInput }
                  value={ email }
                />
              </label>
              <label htmlFor="input-description">
                Descrição
                <textarea
                  type="text"
                  id="description"
                  data-testid="edit-input-description"
                  onChange={ this.verificaInput }
                  value={ description }
                />
              </label>
              <label htmlFor="input-image">
                Imagem
                <input
                  type="text"
                  id="image"
                  data-testid="edit-input-image"
                  onChange={ this.verificaInput }
                  value={ image }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabledButton }
                onClick={ this.update }
              >
                Salvar

              </button>
            </section>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
