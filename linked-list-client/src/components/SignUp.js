import React, { Component } from 'react';
import { 
  Link,
  withRouter,
 } from 'react-router-dom';

 import firebase from 'firebase/app'
import { auth } from '../firebase';

import * as routes from '../constants/routes';

import './SignUp.css'

const SignUp = ({ history }) => 
  <div>
    <div className = "card mx-auto">
     <div className = "cardBody">
       <SignUpForm history={history} />
      </div>
    </div>
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
            <p className="h4 text-center mb-4">Sign up</p>
           
            <div className="md-form">
              <input
                value={username}
                onChange={event => this.setState(byPropKey('username', event.target.value))}
                type="text"
                placeholder="Username"
              />
            </div>

            <div className="md-form">
              <input
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"
              />
            </div>

            <div className="md-form">
              <input
                value={passwordOne}
                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="md-form">
              <input
                value={passwordTwo}
                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            
            <div>
            <button disabled={isInvalid} type="submit" className = "btn btn-primary text-center mt-4">
              Register
            </button>
            </div>

            { error && <p id="errorMessage">{error.message}</p> }
          </form>

      );
    }

  }
  
  const SignUpLink = () => 
    <div className = "sign-up-link mx-auto">
      <p> No account? <Link to={routes.SIGN_UP}>Sign Up</Link></p>
    </div>
  

  export default withRouter(SignUp);

  export {
    SignUpForm,
    SignUpLink,
  };
  