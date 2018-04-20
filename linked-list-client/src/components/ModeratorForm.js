import React, { Component } from 'react';
import firebase from 'firebase/app'

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

    componentDidMount(){
   
    }
    
    
    render(){
        

        return (
        
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
                        <button className="btn #4a148c purple darken-4">Accept</button>
                        <button className="btn #ff5722 deep-orange">Reject</button>
                    </div>
                </div>
            </form>
        )
    }   

}

export default ModeratorForm;
