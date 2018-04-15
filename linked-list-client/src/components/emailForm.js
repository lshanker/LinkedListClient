import React, { Component } from 'react';

import * as routes from '../constants/routes';


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

    render(){

        const {
            subject,
            message,
            error,
          } = this.state;

        return (
        
            <form onSubmit={this.onSubmit}>
                <p className="h5 text-center mb-4">Email this List!</p>
                <input placeholder="Subject" 
                    type="text" 
                    value={subject}     
                    onChange={event => this.setState(byPropKey('subject', event.target.value))}
                />
                <input placeholder="Enter your message here" type="text" value={message} onChange={event => this.setState(byPropKey('message', event.target.value))}/>
                <div className="text-center">
                    <button className="btn #4a148c purple darken-4">Send</button>
                    <button className="btn #ff5722 deep-orange">Discard</button>
                </div>
            </form>
        )
    }   

}

export default EmailForm;