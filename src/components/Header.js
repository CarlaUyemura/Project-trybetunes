import React from 'react';
import { getUser } from '../services/userAPI';
import Load from '../pages/Load';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading2: false,
      name: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    this.setState({
      loading2: true,
    });
    const user = await getUser();
    this.setState({
      loading2: false,
      name: user.name,
    });
  }

  render() {
    const { loading2, name } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {loading2 ? <Load /> : <h3 data-testid="header-user-name">{`Olá, ${name}`}</h3>}
      </header>
    );
  }
}

export default Header;
