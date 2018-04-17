import React, { Component } from 'react';

import withAuthorization from './withAuthorization'
  import { db } from '../firebase';

import NavbarFeatures from './NavbarFeatures'
import NewListForm from './NewListForm';
import SideList from './SideList';
import EmailForm from './EmailForm';

import './Home.css';

const sidebarProps = {
  bar: (<div>Amazing Sidebar</div>),
  size: 200
};

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: null,
      newListFormVisible: false,
      currentListId: null,
    }
  }

  setCurrentListId(currentListId) {
    this.setState({currentListId});
  }

  componentDidMount(){
    db.onceGetUsers().then(snapshot => 
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  toggleNewListForm = () => {
    this.setState({newListFormVisible: !this.state.newListFormVisible})
  }

  renderListSelectMessage(){
    return(
      <h1>Select a List</h1>
    )
  }

  render() {
    const { users } = this.state;

    return (
      <div id="home-root">
          <NavbarFeatures />
          <div className="row" id="home-row">
            <div className="col-2">
              <SideList uid={this.props.userModel.uid} setCurrentList = {this.setCurrentListId.bind(this)}    />
            </div>
            <div className="col-1"></div>
            <div className="col-6">
              {this.state.currentListId ? 
               <EmailForm email = {this.props.userModel.email} currentListId = {this.state.currentListId}/> 
               : <h1><u><i>Select a list</i></u></h1>}    

                
               {this.state.newListFormVisible && <NewListForm userModel = {this.props.userModel} isOpen = {this.state.newListFormVisible} toggle =  {this.toggleNewListForm.bind(this)}/>}          
              <button onClick={() => this.toggleNewListForm()}>toggle form</button>
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