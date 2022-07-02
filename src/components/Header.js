import React from 'react';
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
        {loading ? <Load /> : <h3 data-testid="header-user-name">{`Olá, ${getName}`}</h3>}
      </header>
    );
  }
}

export default Header;
