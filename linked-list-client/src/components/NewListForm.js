import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

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
                this.props.toggle();
            })
            .catch(error => {
                console.log("Create list error: " + error.message);
                this.setState(byPropKey('error', error));
            });

    }
    
    render(){
        
    
        const {
            listName,
            listID,
            error,
        } = this.state;

        return(
        <div id="new-list-form-root">
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleForm}>
               <ModalHeader toggle={this.props.toggle}>New Mailing List</ModalHeader>
                 <ModalBody>
                 <form onSubmit={this.onSubmit} id="newListForm">
                       
                      <div className = "md-form"> 
                            <input
                                type="text" 
                                placeholder="List Name"
                                value = {listName}
                                onChange={event => this.setState(byPropKey('listName', event.target.value))}
                            />
                        </div>
                        <div className = "md-form">
                            <input 
                                type="text"
                                placeholder="List Tag"
                                value = {listID}
                                onChange={event => this.setState(byPropKey('listID', event.target.value))}
                            />
                        </div>
                        <div className = "md-form">
                        <input type="checkbox" id="checkbox1" />Gimme your money
                        </div>
                        { error && <p id="errorMessage">{error.message}</p> }
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => this.props.toggle()}>Close</Button>{' '}
                    <Button color="primary" type="submit" form="newListForm">Save changes</Button>
                </ModalFooter>
            </Modal>
        
                
        {/*
            <div className="overlay"/>
            <div className = "card mx-auto">
                <div className = "cardBody">
                    

                    <button onClick={() => this.props.toggleForm()}>Cancel</button>
                </div>
            </div>
        */}
        </div>
        
    

    
        );
    }
}

export default NewListForm;