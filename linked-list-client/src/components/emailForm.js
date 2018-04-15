import React, { Component } from 'react';

import * as routes from '../constants/routes';


const INITIAL_STATE = {
    subject: '',
    message: '',
    error: null,
  };


class EmailForm extends Component{

    constructor(props){
        super(props);
        this.state={...INITIAL_STATE};
    }
    render(){
        return (
        
            <form onSubmit={this.onSubmit}>
                <p className="h5 text-center mb-4">Write to us</p>
                <input placeholder="Subject" icon="tag" group type="email" validate error="wrong" success="right"/>
                <input placeholder="Enter your message here" label="Your message" icon="pencil"/>
                <div className="text-center">
                    <button color="deep-orange" color="unique">Send <fa icon="paper-plane-o" className="ml-1"/></button>
                </div>
            </form>
                // <h1>Please work</h1>
        )
    }   

}

export default EmailForm;