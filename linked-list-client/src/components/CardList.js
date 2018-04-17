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
                    name = {key}
                    tag = {this.props.mailingListCards[key]}
                    setCurrentList = {this.props.setCurrentList}
                    />
                )}
            </div>
        )
    }
}

export default CardList;