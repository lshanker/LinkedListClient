import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withAuthorization from './withAuthorization';

import NavbarFeatures from './NavbarFeatures'

import * as routes from '../constants/routes';

class Account extends Component {
    render() {
      return (
        <div>
            <NavbarFeatures />
            <h1>Looks like the account page!</h1>
        </div>
      );
    }
}


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Account);

