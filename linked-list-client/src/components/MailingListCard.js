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

        var selectedBackground = "white";
        if(this.props.currentListId === this.props.tag){
            selectedBackground = 'lightblue';
        }

        return(

            <div id="mailingListCard-root">
                <button  className="btn white-space:nowrap" 
                onClick = {() => this.props.setCurrentList(this.props.tag)}
                style={{backgroundColor : selectedBackground}}
                >
                    <h1>{this.props.name}</h1>
                    <p>@{this.props.tag}</p>
                </button>

            </div>
        )
    }
}

export default MailingListCard;