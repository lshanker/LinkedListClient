import React, { Component } from 'react';

import withAuthorization from './withAuthorization'

const queryString = require('query-string');

const INITIAL_STATE = {
    email: '',
  };


class Subscribe extends Component {
    
    constructor(props){
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
      event.preventDefault();

      const parsedQuery = queryString.parse(this.props.location.search);
      const listId = parsedQuery.listId;

      console.log(listId);
    }

    
    render(){

        const{
            email,
        } = this.state;

        return(
          <form onSubmit={this.onSubmit}>

            <p className="h4 text-center py-4">Subscribe</p>
    
            <div className = "md-form">
              <input
                id="email"
                value = {email}
                onChange={event => this.setState({"email": event.target.value})}
                type="text"
                placeholder="Email"
                className="form-control"
              />
            </div>
            
            <div className="text-center mt-4">
              <button  className="btn btn-primary" type="submit">
              Subscirbe
              </button>
            </div>
  
          </form>
        )
    }
}


const authCondition = (authUser) => !!authUser;
  
export default withAuthorization(authCondition)(Subscribe);