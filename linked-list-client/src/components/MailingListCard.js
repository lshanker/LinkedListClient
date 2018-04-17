import React, { Component } from 'react';

import './MailingListCard.css'


class MailingListCard extends Component {
    
    constructor(props){
        super(props);
    }
    
    
    handleClick = () => {
        this.props.setCurrentList(this.props.tag);
    }

    render(){

        return(
            <div id="mailingListCard-root" onClick = {() => this.handleClick()}>
                <h1>{this.props.name}</h1>
                <p>@{this.props.tag}</p>
            </div>
        )
    }
}

export default MailingListCard;