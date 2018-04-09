import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
 } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Navigation from './Navigation';
import SignIn from './SignIn'
import Landing from './Landing';
import SignUp from './SignUp';
import Home from './Home';
import Account from './Account';

import * as routes from '../constants/routes';

class App extends Component {
  render() {
    return (
      <Router>
       <div>
          <Navigation />

          <hr/>

          <Route
            exact path={routes.LANDING}
            component={() => <Landing />}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUp />}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignIn />}
          />
          <Route
            exact path={routes.HOME}
            component={() => <Home />}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={() => <Account />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
