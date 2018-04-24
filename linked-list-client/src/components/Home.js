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

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: null,
      newListFormVisible: false,
      sharePopupVisible: false,
      moderatorFormVisible: false,
      currentListId: null,
      showModButton: false,
    }
  }

  setCurrentListId(currentListId) {
    this.setState({currentListId});
    this.setState({moderatorFormVisible : false})

    //After we select a new list, we have to check if the user can view the mod list
    db.onceGetIsMod(currentListId).then(snapshot => {
      console.log(snapshot.val());
      console.log(!!snapshot.val())
      var flag = !!snapshot.val();
      this.setState(() => ({ showModButton : flag}))
    }); 
  }



  componentDidMount(){
    db.onceGetUsers().then(snapshot => 
      this.setState(() => ({ users: snapshot.val() }))
    );

    
  }

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
                <button type="button" class="btn btn-outline-elegant mx-auto" onClick = {() => {this.toggleSharePopup()}}><i class="fa fa-share-square" aria-hidden="true"></i> Share List</button>
                {
                this.state.showModButton &&
                <button type="button" class="btn btn-primary" onClick = {() => {this.toggleModeratorForm()}}>
                  {this.state.moderatorFormVisible ?
                    ("Mail @" + this.state.currentListId) :
                    "View Pending Emails"
                  }
                </button>
                }
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