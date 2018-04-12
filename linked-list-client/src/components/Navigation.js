import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import SignOutButton from './SignOut'
import AuthUserContext from './AuthUserContext';

import * as routes from '../constants/routes';

//authUser is passed implicitly through the context
//when authUser changes in the provider, it will change in the context
//and change in this component as well
const Navigation = () =>
<nav className="navbar navbar-expand-lg navbar-dark primary-color">
  {/*Navbar brand*/}
  <a className="navbar-brand" href="#">LinkedList</a>
  {/*Collapse button*/}
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav" aria-controls="mainNav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
  </button>
  {/*Collapsible content*/}
  <div className="collapse navbar-collapse" id="mainNav">
    <AuthUserContext.Consumer>
      {authUser => authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
</nav>

const NavigationAuth = () =>
  <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
      <a className="nav-link">
      {/*<Link to={routes.LANDING}>Landing</Link>*/}
      </a>
    </li>
    <li className="nav-item active"><Link to={routes.HOME}>Home</Link></li>
    <li className="nav-item active"><Link to={routes.ACCOUNT}>Account</Link></li>
    <li className="nav-item active"><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li className="nav-item active"><Link to={routes.LANDING}>Landing</Link></li>
    <li className="nav-item active"><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default Navigation;
