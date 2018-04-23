import React, { Component } from 'react';
import { db } from '../firebase';

import './SideList.css'
import CardList from './CardList'
import NewListForm from './NewListForm'


class SideList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lists: null,
        };
    }

    componentDidMount(){
        db.onceGetLists(this.props.userModel.uid).then(snapshot => {
            this.setState(() => ({ lists: snapshot.val() }))
        }
        );

        db.continuousGetList(this.props.userModel.uid, this.onMyListsChange);
        
    }

    toggleNewListForm = () => {
        this.setState({newListFormVisible: !this.state.newListFormVisible})
      }

    onMyListsChange = (snapshot) => {
        this.setState({lists: snapshot.val()})
    }

    render(){
        return(
            <div id="sideList-root">
                {this.state.newListFormVisible && <NewListForm userModel = {this.props.userModel} isOpen = {this.state.newListFormVisible} toggle =  {this.toggleNewListForm.bind(this)}/>}          
                <button className="btn btn-outline-primary" onClick={() => this.toggleNewListForm()}><i className="fa fa-plus" aria-hidden="true"></i> New List</button>

                <p className="h4 text-center py-4">My Lists</p>
                {!!this.state.lists && <CardList mailingListCards={this.state.lists} setCurrentList = {this.props.setCurrentList} currentListId = {this.props.currentListId}/>}
            </div>
        )
    }

}

export default SideList;
