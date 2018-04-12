import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { auth, db } from '../firebase';

import './NewListForm.css';
import AuthUserContext from './AuthUserContext';


//Helper function for setting state
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

const INITIAL_STATE = {
    listName: '',
    listID: '', /*Currently called list tag in the form*/
    error: null,
  };


class NewListForm extends Component {
    
    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE};
    }

    onSubmit = (event) => {
        event.preventDefault();

        const {
            listName,
            listID,
        } = this.state;

        console.log(this.props.userModel.uid);

        db.doCreateList(listID, listName, this.props.userModel.uid, this.props.userModel.email)
            .then(() => {
                console.log("Created list " + listName);
                this.setState({...INITIAL_STATE});
            })
            .catch(error => {
                console.log("Create list error: " + error.message);
                this.setState(byPropKey('error', error));
            });

        /*db.doCreateList(listID, listName, this.props.userModel.uid)
            .then(() => {
                console.log("Created list " + listName);
            })
            .catch(error => {
                console.log("Create list error: " + error.message);
                this.setState(byPropKey('error', error));
            });*/
    }
    
    render(){
        

    
        const {
            listName,
            listID,
            error,
        } = this.state;

        return(
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text" 
                        placeholder="List Name"
                        value = {listName}
                        onChange={event => this.setState(byPropKey('listName', event.target.value))}
                    />
                    <input 
                        type="text"
                        placeholder="List Tag"
                        value = {listID}
                        onChange={event => this.setState(byPropKey('listID', event.target.value))}
                    />

                     

{/*
                    <AuthUserContext.Consumer>
                        {authUser => <input 
                                        value = {authUser}
                                      />
                        }
                    </AuthUserContext.Consumer>
                    */}

                    { error && <p id="errorMessage">{error.message}</p> }
                 
                    <button type="submit">Create List</button>
                </form>
        );
    }
}

export default NewListForm;