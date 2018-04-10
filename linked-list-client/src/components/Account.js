import React, { Component } from 'react';

import withAuthorization from './withAuthorization';

class Account extends Component {
    render() {
      return (
        <div>
            <h1>Looks like the account page!</h1>
        </div>
      );
    }
  }
  

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Account);

