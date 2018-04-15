import React, { Component } from 'react';

const INITIAL_STATE = {
    subject: '',
    message: '',
    error: null,
  };


class emailForm extends Component{

    constructor(props){
        super(props);
        this.state={...INITIAL_STATE};
    }
    render(){
        return (
        
            <form onSubmit={this.onSubmit}>
                <p className="h5 text-center mb-4">Write to us</p>
                <Input label="Your name" icon="user" group type="email" validate error="wrong" success="right"/>
                <Input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                <Input label="Subject" icon="tag" group type="email" validate error="wrong" success="right"/>
                <Input type="textarea" label="Your message" icon="pencil"/>
                <div className="text-center">
                    <Button color="deep-orange" color="unique">Send <Fa icon="paper-plane-o" className="ml-1"/></Button>
                </div>
            </form>

        )
    }   

}