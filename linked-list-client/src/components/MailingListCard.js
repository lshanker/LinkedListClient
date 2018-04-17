import React, { Component } from 'react';

import './MailingListCard.css'


class MailingListCard extends Component {
    
    constructor(props){
        super(props);
    }
    
    
    render(){

        return(
            <div id="mailingListCard-root" onClick = {() => this.props.setCurrentList(this.props.tag)}>
                <h1>{this.props.name}</h1>
                <p>@{this.props.tag}</p>
            </div>
        )
    }
}

export default MailingListCard;