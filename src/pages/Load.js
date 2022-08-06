import React from 'react';
import ReactLoading from 'react-loading';

class Load extends React.Component {
  state = { }

  render() {
    return (
      <div className="container-load">
        <ReactLoading type="bars" color="rgb(44, 102, 110)" width="150px" />
        <h2 className="load-text">Carregando...</h2>
      </div>
    );
  }
}

export default Load;
