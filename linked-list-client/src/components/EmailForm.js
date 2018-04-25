import React, { Component } from 'react';
import firebase from 'firebase/app'
import axios from 'axios'

import * as urls from '../constants/urls'

import { auth, db } from '../firebase';

import './EmailForm.css'

const INITIAL_STATE = {
    subject: '',
    message: '',
    isMod: false,
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });
function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function myFunction2() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar2");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

class EmailForm extends Component{

    constructor(props){
        super(props);
        this.state={...INITIAL_STATE};
    }

    onSubmit= (event) => {
        event.preventDefault();

        const {
            subject,
            message,
            isMod
        } = this.state;

        db.onceGetIsMod(this.props.currentListId).then(snapshot => {
            var flag = !!snapshot.val();
            this.setState(() => ({ isMod : flag}))
        console.log("only" + this.state.isMod);
        console.log(subject + message);
        
        if(this.state.isMod){
            db.doStoreModEmail(subject, message, this.props.currentListId, this.props.email);
            myFunction2();
        } else {
            db.doStoreEmail(subject, message, this.props.currentListId, this.props.email);
    
            axios.get(urls.SERVER + "mail", {
                params: {
                    "list": this.props.currentListId,
                    "message": message,
                    "subj": subject
                }
        
            })
            .then(function (response) {
                console.log(response);
                })
                .catch(function (error) {
                console.log(error);
                });
                myFunction();
            }
         });     

         this.setState({...INITIAL_STATE})
    }

    render(){

        const {
            subject,
            message,
            // error, 
            // What to do with this?
          } = this.state;

        const isInvalid = this.state.subject === "" || this.state.message === "";

        return (
        <div id="emailForm-root" className="card mx-auto">
            <div className="cardBody">
                <form onSubmit={this.onSubmit}>
                    <p className="h5 text-center mb-4 mt-4">Email this List! (@{this.props.currentListId})</p>
                    <div className="md-form">
                        <input
                            className="mt-3" 
                            placeholder="Subject" 
                            type="text" 
                            value={subject}     
                            onChange={event => this.setState(byPropKey('subject', event.target.value))}
                        />
                        <textarea
                            className="form-control mt-3 md-textarea width:100%"
                            rows="3" 
                            placeholder="Enter your message here" 
                            type="text" 
                            value={message} 
                            onChange={event => this.setState(byPropKey('message', event.target.value))}
                        />
                    
                        <div className="text-center">

                            <button disabled = {isInvalid} className="btn #4a148c purple darken-4"><i className="fa fa-send" aria-hidden="true"></i> Send</button>

                        </div>
                    </div>
                </form>
            </div>
            <div id="snackbar2">your email is in moderation queue!</div>
            <div id="snackbar">you sent an email!</div>
        </div>
        )
    }   

}

export default EmailForm;
