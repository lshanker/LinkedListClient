import React, { Component } from 'react';

import withAuthorization from './withAuthorization'
import { db } from '../firebase';

import NavbarFeatures from './NavbarFeatures'
import NewListForm from './NewListForm';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: null,
    }
  }

  componentDidMount(){
    db.onceGetUsers().then(snapshot => 
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  render() {
    const { users } = this.state;

    return (
      <div>
          <NavbarFeatures />
          <h1>Looks like the home page!</h1>
          <NewListForm userModel = {this.props.userModel} />
          { !!users && <UserList users={users} /> }
      </div>
    );
  }
}


//An example of parsing the user list
const UserList = ({ users }) =>
  <div>
    <h2>Usernames</h2>
    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

//I believe this checks if authUser is null
const authCondition = (authUser) => !!authUser;
  
export default Home;