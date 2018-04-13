import React, { Component } from 'react';

import withAuthorization from './withAuthorization'
import { db } from '../firebase';

import NavbarFeatures from './NavbarFeatures'
import NewListForm from './NewListForm';
import SideList from './SideList';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: null,
      newListFormVisible: false,
    }
  }

  componentDidMount(){
    db.onceGetUsers().then(snapshot => 
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  toggleNewListForm = () => {
    this.setState({newListFormVisible: !this.state.newListFormVisible})
  }

  render() {
    const { users } = this.state;

    return (
      <div>
          <NavbarFeatures />
          <div className="row">
            <div className="col-2">
              <SideList />
            </div>
            <div className="col-10">
              <h1>Looks like the home page!</h1>
              {/*Only display the new list form on button click*/}
              {this.state.newListFormVisible && <NewListForm userModel = {this.props.userModel} isOpen = {this.state.newListFormVisible} toggle = {this.toggleNewListForm.bind(this)} /> }
              { !!users && <UserList users={users} /> }
              <button onClick = {() => this.toggleNewListForm()}>Toggle Form</button>
            </div>
          <div/>
      </div>
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
  
export default withAuthorization(authCondition)(Home);