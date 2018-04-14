import React, { Component } from 'react';

import './SideList.css'
import MailingListCard from './MailingListCard';


class SideList extends Component {
    
    render(){
        return(
            <div id="sideList-root">
                <p className="h4 text-center py-4">My Lists</p>
            </div>
        )
    }
}


const CardList = ({ mailingListCards }) => 
    <div>
        {Object.keys(mailingListCards).map(key =>
        <MailingListCard 
            key={key}
            name = {mailingListCards[key].name}
            tag = {mailingListCards[key].tag}
            />
         )}
    </div>

export default SideList;