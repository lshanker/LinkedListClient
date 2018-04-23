import React, { Component } from 'react';
import { db } from '../firebase';

import { withRouter } from 'react-router-dom';

import './Subscribe.css'

//import queryString from 'query-string';

//const queryString = require('query-string');

var URLSearchParams = require('url-search-params');

const INITIAL_STATE = {
    email: '',
    listId: null,
  };


class Subscribe extends Component {
    
    constructor(props){
        super(props);

        this.state = { ...INITIAL_STATE };
    }


    componentDidMount(){
      var url = window.location.href;
      var query = url.substring(url.indexOf("?") + 1, url.length);
      console.log(query);
      var searchParams = new URLSearchParams(query);
      
      const listId = searchParams.get("listId");
    
      console.log(searchParams)
      console.log(window.location.href);
      console.log(listId)
      this.setState({listId});
    }

    onSubmit = (event) => {
      event.preventDefault();

      db.subscribe(this.state.listId, this.state.email, this.subscribeCallback);
 
    }
    
    subscribeCallback = () => {
      console.log("subscribed");
    }

    render(){

        const{
            email,
            listId,
        } = this.state;

        return(
          <div id="subscribe-root">
            <div className="card mx-auto">
            <div className="cardBody">
              <form onSubmit={this.onSubmit}>

                <p className="h4 text-center py-4">Subscribe to @{this.state.listId}</p>
        
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
            </div>
          </div>
        </div>
        )
    }
}


const authCondition = (authUser) => !!authUser;
  
export default withRouter(Subscribe);