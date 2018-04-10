import React, { Component } from 'react';
import { 
  Link,
  withRouter,
 } from 'react-router-dom';

 import firebase from 'firebase/app'
import { auth } from '../firebase';

import * as routes from '../constants/routes';


const SignUp = ({ history }) => 
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>


  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  class SignUpForm extends Component {

    constructor(props){
      super(props);
      //... is the spread operator. It will expand the INITIAL_STATE
      this.state = { ...INITIAL_STATE};
    }

    //When the sign up form is submitted
    onSubmit = (event) => {

      event.preventDefault();

      const {
        username,
        email,
        passwordOne,
      } = this.state;

      const {
        history,
      } = this.props;

  
      firebase.auth().createUserWithEmailAndPassword(email, passwordOne).then(authUser => 
        {
          this.setState(() => ({ ...INITIAL_STATE}));
          history.push(routes.HOME);
        })
        .catch(error => {
          console.log("Sign up error: " + error.message);
          this.setState(byPropKey('error', error));
        });

        event.preventDefault();
    }

    render(){

      const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

      return(
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          { error && <p>{error.message}</p> }
        </form>
      );
    }

  }
  
  const SignUpLink = () => 
    <p>
      No account?
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  

  export default withRouter(SignUp);

  export {
    SignUpForm,
    SignUpLink,
  };
  