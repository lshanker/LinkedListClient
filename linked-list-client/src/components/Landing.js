import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import * as routes from '../constants/routes';

import './Landing.css'

class Landing extends Component {
    render() {
      return (
        <div id="landing-root" className="h-100 row align-items-center">
            <div className="mx-auto">
              <h1>LinkedList</h1>
              <p>A modern mailing list client</p>
              <div className="button-container">
                <Link to={routes.SIGN_IN}>    
                  <button id="sign-in-" className="btn">Sign In</button>
                </Link>
              </div>
              
            </div>
        </div>
      );
    }
  }
  
export default Landing;