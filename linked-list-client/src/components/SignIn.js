import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';

//This doesn't work... not sure why
import { auth } from '../firebase/index';

import firebase from 'firebase/app'
import * as routes from '../constants/routes';

import './SignIn.css'


const SignIn = ({ history }) =>
  <div id="sign-in-root">
    <div className = "card mx-auto">
      <div className = "cardBody">
        <SignInForm history={history} />
        <SignUpLink />
      </div> 
    </div>
    
  </div>





const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {

    event.preventDefault();

    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    //Should be auth.doSignInWithEmailAndPassword but doesn't work
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>

        <p className="h4 text-center py-4">Sign In</p>

        <div className = "md-form">
          <input
            id="signInEmail"
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email"
            className="form-control"
          />
        </div>

        <div className="md-form">
          <input
            id="signInPassword"
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Password"
            className="form-control"
          />
        </div>

        
        <div className="text-center mt-4">
          <button  className="btn btn-primary" disabled={isInvalid} type="submit">
          Sign In
          </button>
        </div>

        { error && <p>{error.message}</p> }
      </form>
    
    );
  }
}

export default withRouter(SignIn);

export {
  SignInForm,
};