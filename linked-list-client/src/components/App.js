import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
 } from 'react-router-dom';

import { firebase } from '../firebase';
import logo from './logo.svg';
import './App.css';

import Navigation from './Navigation';
import SignIn from './SignIn'
import Landing from './Landing';
import SignUp from './SignUp';
import Home from './Home';
import Account from './Account';
import PasswordForget from './PasswordForget';
import Subscribe from './Subscribe';

import * as routes from '../constants/routes';

import withAuthentication from './withAuthentication';
import { initializeApp } from 'firebase/app';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  userModel: null,
};


const myHome = (props) => {
  return (
    <Home
      {...props}
    />
  );
}


class App extends Component {

  constructor(){
    super();
    this.state = { ...INITIAL_STATE};
  }

  componentWillMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser){
        this.setState(byPropKey('userModel', authUser));
      }
    });
  }



  render(){
    return(
    <Router>
      <div data-reactroot>
    
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
          render={
            () => (
              <Home userModel = {this.state.userModel}/>
            )
          }
        />
        <Route
          exact path={routes.PASSWORD_FORGET}
          component={() => <PasswordForget />}
        />
        <Route
          exact path={routes.SUBSCRIBE}
          component={() => <Subscribe />}
        />
      </div>
       
    </Router>
    );
  }

}

export default withAuthentication (App);
