import React, { Component } from 'react';

import ModeratorForm from './ModeratorForm';

class ModeratorFormContainer extends Component {
    
    constructor(props){
        super(props);
    }
    
    render(){

        return(
            <div id="moderatorFormContainer-root">
                <ModeratorForm />
            </div>
        )
    }
}

export default ModeratorFormContainer;