import React, { Component } from 'react';
import firebase from 'firebase/app'
import axios from 'axios'

import * as urls from '../constants/urls'

import { auth, db } from '../firebase';


const INITIAL_STATE = {
    subject: '',
    message: '',
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });


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
        } = this.state;

        
        console.log(subject + message);
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
    }

    render(){

        const {
            subject,
            message,
            // error, 
            // What to do with this?
          } = this.state;

        return (
        
            <form onSubmit={this.onSubmit}>
                <p className="h5 text-center mb-4 mt-4">Email this List!</p>
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
                        <button className="btn #4a148c purple darken-4">Send</button>
                        <button className="btn #ff5722 deep-orange">Discard</button>
                    </div>
                </div>
            </form>
        )
    }   

}

export default EmailForm;
