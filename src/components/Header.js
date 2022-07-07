import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from '../pages/Load';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getName: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      loading: false,
      getName: user.name,
    });
  }

  render() {
    const { loading, getName } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <span>
          {
            loading
              ? <Load /> : <h4 data-testid="header-user-name">{getName}</h4>
          }
        </span>
        <h2>TrybeTunes</h2>
        <section>
          <nav>
            <NavLink
              to="/search"
              activeClassName="selected"
              data-testid="link-to-search"
              className="menu-items"
            >
              Pesquisa

            </NavLink>
            <NavLink
              to="/favorites"
              activeClassName="selected"
              data-testid="link-to-favorites"
              className="menu-items"
            >
              Favoritas

            </NavLink>
            <NavLink
              to="/profile"
              activeClassName="selected"
              data-testid="link-to-profile"
              className="menu-items"
              exact
            >
              Profile

            </NavLink>
          </nav>
        </section>
      </header>
    );
  }
}

export default Header;
