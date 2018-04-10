import React, { Component } from 'react';

import withAuthorization from './withAuthorization'

class Home extends Component {
    render() {
      return (
        <div>
            <h1>Looks like the home page!</h1>
        </div>
      );
    }
  }

//I believe this checks if authUser is null
const authCondition = (authUser) => !!authUser;
  
export default withAuthorization(authCondition)(Home);