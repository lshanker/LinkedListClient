import React, { Component } from 'react';
import { db } from '../firebase';

import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

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
      const parsedQuery = queryString.parse(this.props.location.search);
      const listId = parsedQuery.listId;
      this.setState({listId});
    }

    onSubmit = (event) => {
      event.preventDefault();

      db.subscribe(this.state.listId, this.state.email, () => {
        console.log('Successfully subscribed');
      });
 
    }

    
    render(){

        const{
            email,
            listId,
        } = this.state;

        return(
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
        )
    }
}


const authCondition = (authUser) => !!authUser;
  
export default withRouter(Subscribe);