import React, { Component } from 'react';

import ModeratorForm from './ModeratorForm';
import { db } from '../firebase';

class ModeratorFormContainer extends Component {
    
    constructor(props){
        super(props);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.currentListId);
        db.doDeleteList(this.props.currentListId);

    }
    
    render(){

        return(
            <div id="moderatorFormContainer-root">
                <form onSubmit={this.onSubmit}>
                    <button className="btn #4a148c red darken-4">Delete Current List</button>
                </form>
                <ModeratorForm />
            </div>
        )
    }
}

export default ModeratorFormContainer;