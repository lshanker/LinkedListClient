import React, { Component } from 'react';

import withAuthorization from './withAuthorization'
  import { db } from '../firebase';

import NavbarFeatures from './NavbarFeatures'
import NewListForm from './NewListForm';
import SideList from './SideList';
import EmailForm from './EmailForm';
import SharePopup from './SharePopup';
import ModeratorForm from './ModeratorForm';
import ModeratorFormContainer from './ModeratorFormContainer'

import './Home.css';
import { isOwnerList } from '../firebase/db';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: null,
      newListFormVisible: false,
      sharePopupVisible: false,
      moderatorFormVisible: false,
      currentListId: null,
      isOwner: false,
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.currentListId);
    db.doDeleteList(this.state.currentListId);

}

  setCurrentListId(currentListId) {
    this.setState({currentListId});
    this.setState({moderatorFormVisible : false})
    this.setOwner(currentListId);

  }

  setOwner(currentListId) {
    isOwnerList(currentListId, this.props.userModel.uid, (flag) => {
      this.setState({isOwner: flag});
    });
  }

  componentDidMount(){
    db.onceGetUsers().then(snapshot => 
      this.setState(() => ({ users: snapshot.val() }))
    );

    
  }

  // componentWillMount(){
  //   this.setOwner(this.state.currentListId)
  // }

  // toggleNewListForm = () => {
  //   this.setState({newListFormVisible: !this.state.newListFormVisible})
  // }


  toggleSharePopup = () => {
    this.setState({sharePopupVisible: !this.state.sharePopupVisible})
  }

  toggleModeratorForm = () => {
    this.setState({moderatorFormVisible: !this.state.moderatorFormVisible})
  }

  render() {
    const { users } = this.state;

    return (
      <div id="home-root">
          <NavbarFeatures />
          <div className="row" id="home-row">
            <div className="col-2">
              <SideList userModel={this.props.userModel} setCurrentList = {this.setCurrentListId.bind(this)} currentListId = {!!this.state.currentListId ? this.state.currentListId : ""}   />
            </div>
            <div className="col-1"></div>
            <div className="col-6">
            {/*this.state.newListFormVisible && <NewListForm userModel = {this.props.userModel} isOpen = {this.state.newListFormVisible} toggle =  {this.toggleNewListForm.bind(this)}/>*/}
            {this.state.sharePopupVisible && <SharePopup currentListId = {this.state.currentListId} isOpen = {this.state.sharePopupVisible} toggle =  {this.toggleSharePopup.bind(this)}/>}

              {/* {this.state.currentListId && <EmailForm email = {this.props.userModel.email} currentListId = {this.state.currentListId}/>} */}
              {/* {var ? ifTrue : ifFalse} */}
              {this.state.currentListId ? 
              <div>
                {this.state.moderatorFormVisible ?
                <ModeratorFormContainer listId = {this.state.currentListId}/>
                : <EmailForm email = {this.props.userModel.email} currentListId = {this.state.currentListId}/> 
                }
                {this.state.isOwner ?
                <form onSubmit={this.onSubmit}>
                  <button className="btn #4a148c red darken-4">Delete Current List</button>
                </form> 
                : <p></p>
                }
                    
                <button type="button" className="btn btn-outline-elegant mx-auto" onClick = {() => {this.toggleSharePopup()}}><i class="fa fa-share-square" aria-hidden="true"></i> Share List</button>
                <button type="button" className="btn btn-primary" onClick = {() => {this.toggleModeratorForm()}}>
                  {this.state.moderatorFormVisible ?
                    ("Mail @" + this.state.currentListId) :
                    "View Pending Emails"
                  }
                </button>
               </div>
               : <h1><u><i>Select a list</i></u></h1>}              
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