import React, { Component } from 'react';

import MailingListCard from './MailingListCard';

class CardList extends Component {
    constructor (props) {
        super(props);
    }


    render(){

        return(
            <div>
              {Object.keys(this.props.mailingListCards).map(key =>
                <MailingListCard 
                    key={key}
                    tag = {key}
                    name = {this.props.mailingListCards[key]}
                    setCurrentList = {this.props.setCurrentList}
                    currentListId = {this.props.currentListId}
                    />
                )}
            </div>
        )
    }
}

export default CardList;