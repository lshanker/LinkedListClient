import React, { Component } from 'react';
import firebase from 'firebase/app'

import * as urls from '../constants/urls'

import { auth, db } from '../firebase';


const INITIAL_STATE = {
    subject: '',
    message: '',
    email: '',
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });


class ModeratorForm extends Component{

    constructor(props){
        super(props);
        this.state={...INITIAL_STATE};
    }

    onSubmit= (event) => {
        event.preventDefault();
    }

    componentDidMount(){
        for(var key in this.props.currentEmail){
            this.setState({email : this.props.currentEmail[key]})
        }
    }

    
    
    render(){
        //console.log(
        //    (this.props)
        //);
        return (
        
            <form onSubmit={this.onSubmit}>
                <p className="h5 text-center mb-4 mt-4">Pending Email</p>
                <div className="md-form">
                    <input
                        contentEditable="false"
                        className="mt-3" 
                        placeholder="Subject" 
                        type="text" 
                        value={!!this.state.email ? this.state.email : "null error"}   
                    />
                    <textarea
                        contentEditable="false"
                        className="form-control mt-3 md-textarea width:100%"
                        rows="3" 
                        placeholder="Enter your message here" 
                        type="text"
                        value={"!!this.state.email && this.state.email"} 
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
