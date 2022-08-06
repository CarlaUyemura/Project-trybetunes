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
    }, this.verificaInputInt);
  }

  verificaInputInt = () => {
    const { name, description, email, image } = this.state;
    if (name && description && email && image) {
      this.setState({
        disabledButton: false,
      });
    }
  }

  verificaInput = ({ target }) => {
    const { name, description, email, image } = this.state;
    this.setState({
      [target.id]: target.value,
    });
    if (name.length && description.length && email.length && image.length) {
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
      loading: false,
    }, () => {
      this.setState({
        redirect: true,
      });
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
            <section className="container-list">
              <h2 className="title-list">Editar Perfil</h2>
              <div className="container-edit">
                <form className="container-form">

                  <img
                    src={ !image ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlPVKZNZ0WWVF_15Icrv5cD4-UUk6cvfgBXHRMf79jimY1DNo0oJ_0DD1_tNF4zUGOB7Q&usqp=CAU' : image }
                    alt={ `Imagem de ${name}` }
                    data-testid="profile-image"
                    className="img-profile"
                  />
                  <div className="div-form">
                    <label htmlFor="input-name" className="label-edit">
                      Nome
                      <input
                        type="text"
                        id="name"
                        data-testid="edit-input-name"
                        onChange={ this.verificaInput }
                        value={ name }
                        className="input-edit"
                      />
                    </label>
                    <label htmlFor="input-email" className="label-edit">
                      Email
                      <input
                        type="email"
                        id="email"
                        data-testid="edit-input-email"
                        onChange={ this.verificaInput }
                        value={ email }
                        className="input-edit"
                      />
                    </label>
                    <label htmlFor="input-description" className="label-edit">
                      Descrição
                      <textarea
                        type="text"
                        id="description"
                        data-testid="edit-input-description"
                        onChange={ this.verificaInput }
                        value={ description }
                        className="input-edit"
                      />
                    </label>
                    <label htmlFor="input-image" className="label-edit">
                      Imagem
                      <input
                        type="text"
                        id="image"
                        data-testid="edit-input-image"
                        onChange={ this.verificaInput }
                        value={ image }
                        className="input-edit"
                      />
                    </label>
                  </div>
                </form>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ disabledButton }
                  onClick={ this.update }
                >
                  Salvar

                </button>
              </div>
            </section>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
