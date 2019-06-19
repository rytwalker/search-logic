import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Callback from './components/Callback';
import Main from './components/Main';
import NotFound from './components/NotFound';
import Secret from './components/Secret';
import Auth from './Auth';
import SearchView from './components/SearchView';

class App extends Component {
  state = { auth: new Auth() };

  render() {
    const { auth } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Main {...props} auth={auth} />}
          />
          <Route
            path="/secret"
            component={auth.isAuthenticated() ? Secret : NotFound}
          />
          <Route path="/search" component={SearchView} />
          <Route path="/callback" component={Callback} />
          <Route path="*" exact component={NotFound} />>
        </Switch>
      </div>
    );
  }
}

export default App;
