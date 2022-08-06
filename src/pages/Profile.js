import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Load from './Load';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    this.setState({
      loading: true,
      user: await getUser(),
    });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div
        data-testid="page-profile"
      >
        <Header />
        {loading ? <Load /> : (
          <div className="container-profile">
            <div className="profile">
              <img
                src={ !user.image ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlPVKZNZ0WWVF_15Icrv5cD4-UUk6cvfgBXHRMf79jimY1DNo0oJ_0DD1_tNF4zUGOB7Q&usqp=CAU' : user.image }
                alt={ `Imagem de ${user.name}` }
                data-testid="profile-image"
                className="img-profile"
              />
              <div>
                <h2 className="title-profile">Nome</h2>
                <p className="data-profile">{user.name}</p>
                <h2 className="title-profile">Email</h2>
                <p className="data-profile">
                  {!user.email ? 'usuario@usuario.com' : user.email }
                </p>
                <h2 className="title-profile">Descrição</h2>
                <p className="data-profile">
                  {!user.description ? 'Insira uma descrição aqui!!' : user.description}
                </p>
              </div>
              <NavLink to="/profile/edit">
                <button
                  type="button"
                >
                  Editar perfil

                </button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
