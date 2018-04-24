import React, { Component } from 'react';
import firebase from 'firebase/app'
import axios from 'axios'

import * as urls from '../constants/urls'

import { auth, db } from '../firebase';


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ModeratorForm extends Component{

    constructor(props){
        super(props);
    }

    onSubmit= (event) => {
        event.preventDefault();

    }


    handleAcceptClick = () => {
        console.log('accept clicked');
        axios.get(urls.SERVER + "mail", {
            params: {
                "list": this.props.listId,
                "message": this.props.email.message,
                "subj": this.props.email.subject,
            }
        })
        .then(function (response) {
            console.log(response);
            db.doDeleteModEmail(this.props.listId, this.props.emailId);
            db.doStoreEmail(this.props.email.subject, this.props.email.message, this.props.listId, this.props.email.email);
        })
          .catch(function (error) {
            console.log(error);
        });

        this.forceUpdate();

    }

    handleRejectClick = () => {
        db.doDeleteModEmail(this.props.listId, this.props.emailId);
        this.props.removeEmail();
        //this.forceUpdate();
    }
    
    render(){
        
        return (
        <div id="emailForm-root" className="card mx-auto">
            <div className="cardBody">
                <form onSubmit={this.onSubmit}>
                    <p className="h5 text-center mb-4 mt-4">Pending Email</p>
                    <p>Sender: {!!this.props.email ? this.props.email.email : ""}</p>
                    <div className="md-form">

                        <input
                            contentEditable="false"
                            className="mt-3" 
                            placeholder="Subject" 
                            type="text" 
                            value={!!this.props.email ? this.props.email.subject : ""}   
                        />

                        <textarea
                            contentEditable="false"
                            className="form-control mt-3 md-textarea width:100%"
                            rows="3" 
                            placeholder="Enter your message here" 
                            type="text"
                            value={!!this.props.email ? this.props.email.message : ""} 
                        />
                    
                        <div className="text-center">
                            <button onClick = {() => this.handleAcceptClick()} className="btn #4a148c purple darken-4">Accept</button>
                            <button onClick = {() => this.handleRejectClick()} className="btn #ff5722 deep-orange">Reject</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        )
    }   

}
ModeratorForm.defaultProps = {
    email: {
        subject: 'default subj',
        message: 'default message',
        email: 'default email',
    }
}


export default ModeratorForm;
