import React from 'react';

class NotFound extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div
        data-testid="page-not-found"
        className='container-notFound'
      >
        <button
          className='button-home'
          type="button"
          onClick={ () => {
            history.push('/');
          } }
        >
          Home

        </button>
      </div>
    );
  }
}

export default NotFound;
