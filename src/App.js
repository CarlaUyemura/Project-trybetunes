import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <Switch>
        <Route
          path="/"
          render={
            (props) => <Login { ...props } loading={ loading } />
          }
          exact
        />
        <Route
          path="/search"
          render={
            (props) => <Search { ...props } loading={ loading } />
          }
        />
        <Route
          path="/album/:id"
          render={ (props) => (<Album
            { ...props }
            loading={ loading }
          />) }
        />
        <Route path="/favorites" render={ (props) => <Favorites { ...props } /> } />
        <Route path="/profile" render={ (props) => <Profile { ...props } /> } exact />
        <Route
          path="/profile/edit"
          render={
            (props) => <ProfileEdit { ...props } />
          }
        />
        <Route
          path="*"
          render={
            (props) => <NotFound { ...props } />
          }
        />
      </Switch>
    );
  }
}

export default App;
